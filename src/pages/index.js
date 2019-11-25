import React from "react"
import { sortBy } from 'lodash'

import Layout from "../components/layout"
import { Router, Location } from "@reach/router"
import { navigate } from "gatsby"
import { Message, Input, Button, Table, Segment } from 'semantic-ui-react'
import axios from 'axios'
import xbytes from 'xbytes'
import magnets from '../images/icon-magnet.gif'
import SEO from '../components/seo'
import './index.css'

// import MockAdapter from 'axios-mock-adapter'

// var mock = new MockAdapter(axios);
// const stub = [
//     {
//         title: "title3",
//         seeds: 3,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     },
//     {
//         title: "title",
//         seeds: 1,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     }, {
//         title: "title1",
//         seeds: 2,
//         size: "1000mb",
//         torrent: "fddsfd",
//         magnet: "asdf"
//     },
// ]
// mock.onGet(new RegExp("/torrents/*")).reply(200, {
//     torrents: stub
// }
// );
const log = console.log

//normalizes text of size with different units
function parseSize(inp) {
    return inp.map(x => {
        const number = xbytes.parseSize(x.size)
        x.number = number
        x.size = xbytes(number)
        return x
    })
}

const isIntro = (
    <Message>
        <Message.Content>
            <Message.Header><h2>Torrentz2 Search Engine</h2></Message.Header>
            <Message.List>
            <Message.Item>Torrentz2.link is a free, fast and powerful meta-search engine combining results from <a href="https://katcr.to">KickassTorrents</a>, <a href="https://thepiratebay.org">The Pirate Bay</a>, <a href="https://www.rarbg.cc">Rarbg</a>, <a href="https://torrentz2.eu">Torrentz2</a>, <a href="https://www.1337x.to/">1337x</a> of search engines.</Message.Item>
            <Message.Item>Torrentz2 Search Engine is on Torrentz2.eu but now it is here also in 2019 - You Can Download All Games, Movies, Software, Plugins Etc. Torrentz 2019 | Note: we are not forcing you - Tamilrockers, Torrentz3.</Message.Item>           
            <Message.Item>Torrentz2.link is similar to Torrentz2.eu.</Message.Item>    
            <Message.Item>We don't host any torrents, we don't even save torrents for ourselves after the filename,seed, and size extraction.</Message.Item>       
            <Message.Item>Torrentz has a spotless relationship with copyright owners and governmental organizations (Child protection, etc).</Message.Item>
            <Message.Item>Torrentz loves you.</Message.Item>

            {/* <Message.Item>Try move general keywords or fewer keywords.</Message.Item> */}
            </Message.List>   

            <p></p>
            <p></p>
            <Message.Header><h2>About Torrentz2</h2></Message.Header>
            <Message.List>
            <Message.Item>Torrentz is a search engine simulatenously aggregator and a Multisearch. This means we just search other search engines.</Message.Item>
            <Message.Item>Downloading copyrighted material isn’t legal. Be careful of what you download or face the consequences.</Message.Item>
            <Message.Item>we don't index any data here and we don't host any torrent here - Please read below our privacy policy.</Message.Item>
            </Message.List>  


            <p></p>
            <p></p>
            <Message.Header><h2>Frequently asked questions (FAQ)</h2></Message.Header>
            <Message.List>
            <Message.Item><a href="https://www.utorrent.com/help/guides/beginners-guide">BitTorrent tutorial</a> - If you are <strong>new to BitTorrent</strong>, internets and tubes read this first.</Message.Item>
            <Message.Item><strong>How to use Torrentz2 Magnet link?</strong> You just need to click on magnet link or Magnet image mentioned in right side of the torrent search result. To let it work, you need to have the torrent client application that supports a torrent, such as&nbsp;<a href="https://www.bittorrent.com/" target="_blank" rel="nofollow">Bittorrent</a>,&nbsp;<a href="https://www.utorrent.com/" target="_blank" rel="nofollow">Utorrent</a>,&nbsp;<a href="https://play.google.com/store/apps/details?id=co.we.torrent&amp;hl=en">WeTorrent</a>, <a href="https://play.google.com/store/apps/details?id=intelligems.torrdroid">TorrDroid</a> or&nbsp;<a href="https://play.google.com/store/apps/details?id=co.we.torrent" target="_blank" rel="nofollow">Flud</a>.</Message.Item>
            <Message.Item><strong>What is torrentz2.link?</strong> Torrentz2.link is an best alternative to search most popular torrent website Torrentz, which serves you the torrent files&nbsp;to download latest movies, games, softwares and document files.</Message.Item>
            <Message.Item>How do I upload to torrentz? - You simply can't, this is a meta-search engine and not a torrent directory.</Message.Item>

            </Message.List>  


            </Message.Content>
    </Message>
)

function hasLoaded(number) {
    return (<Message success size='mini'>
        <Message.Content>
            <Message.Header>Found {number} results.</Message.Header>
        </Message.Content>
    </Message>)
}

const isLoading = (<Message icon info size='mini'>
    {/* <Icon name='circle notched' loading /> */}
    <Message.Content>
        <Message.Header>Loading...</Message.Header>
    </Message.Content>
</Message>)

const isNothing = (input) => (<Message icon warning size='mini'>
    {/* <Icon name='undo' /> */}
    <Message.Content>
        <Message.Header>Your search - {input} - did not match any documents</Message.Header>
        <Message.List>
            <Message.Item>Make sure that all words are spelled correctly.</Message.Item>
            <Message.Item>Try different keywords.</Message.Item>
            <Message.Item>Try move general keywords or fewer keywords.</Message.Item>
        </Message.List>
    </Message.Content>
</Message>)

const isError = (error) => (<Message icon negative size='mini'>
    {/* <Icon name='x' /> */}
    <Message.Content>
        <Message.Header>Error Try Again</Message.Header>
        {error}
    </Message.Content>
</Message>)

const http = axios.create({
    timeout: 120000,
    baseURL: "https://torrentsfreelancer.herokuapp.com/"
})
// .create({
// //   baseURL: 'https://3000-f7a9f611-984b-4cc3-a802-859bf1fe449b.ws-ap0.gitpod.io/torrents',
//   timeout: 11000,
// });

const stateFlags = {
    loading: false,
    error: false,
    nothing: false,
    errorMsg: "",
}

class IndexPage extends React.Component {
    state = {
        loading: false,
        results: [],
        error: false,
        nothing: true, //if no query has been made
        input: "",
        column: 'seeds',
        direction: 'descending',
        search: null,
    }
    componentDidMount() {
        const query = this.props.query
        if (query && query != "" && typeof query != "undefined") {
            this.searchBegun()
            this.setState({ input: query })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query != this.props.query) {
            this.searchBegun()
        }
    }
    handleSort = (clickedColumn) => () => {
        const { column, results, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                results: sortBy(results, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }

        this.setState({
            results: results.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    initialSort = (results) => {
        const { column, direction } = this.state
        let sResults = sortBy(results, column)
        if (direction == 'descending') {
            sResults = sResults.reverse()
        }
        return sResults
    }
    searchBegun = () => {
        const query = this.props.query
        this.setState({ ...stateFlags, loading: true, search: query })
        const x = query
        if (x == "child porn" ||
            x == "child fuck" ||
            x == "porn" ||
            x == "sex" ||
            x == "fuck" ||
            x == "brazzers" ||
            x == "pornhub" ||
            x == "xvideos" ||
            x == "transgender" ||
            x == "xvideo" ||
            x == "fetus" ||
            x == "anal" ||
            x == "fetish" ||
            x == "gay sex" ||
            x == "chut" ||
            x == "blow job" ||
            x == "fetus" ||
            x == "fetish" ||
            x == "bhabhi" ||
            x == "indian porn" ||
            x == "mia khalifa" ||
            x == "indian sex" ||
            x == "porn video" ||
            x == "she male" ||
            x == "HOTEL MUMBAI" ||
            x == "Hotel mumbai" ||
            x == "hotel mumbai" ||
            x == "porn 2019" ||
            x == "sex videos" ||
            x == "sex video" ||
            x == "HOTEL MUMBAI" ||
            x == "porn video" ||
            x == "sex 2019" ||
            x == "2019 sex" ||
            x == "2019 porn" ||
            x == "Adult" ||
            x == "Sunny leone" ||
            x == "shemale") {
            this.setState({ ...stateFlags, error: true })
            alert('This words is a blocked by us. Try Different words')
        } else {
            this.setState({ ...stateFlags, loading: true })
            http.get("/torrents/" + query.toLowerCase()).then(this.searchResolve).catch(x => {
                console.log(x)
                this.setState({ ...stateFlags, error: true })
            })
        }
    }
    searchResolve = (res) => {
        const r = this.initialSort(parseSize(res.data.torrents))
        const query = this.props.query
        this.setState({ ...stateFlags, results: r })
    }
    hInput = (e) => {
        this.setState({ input: e.target.value })
    }
    hSubmit = (e) => {
        if (e.key == "Enter") {
            this.searchBegin()
        }
    }
    searchBegin = () => {
        if (this.state.input.length == 0) {
            this.setState({ ...stateFlags, error: true, errorMsg: "You can't search with empty input. Type something into field above and then search." })
        } else {
            navigate("/search/" + this.state.input.toLowerCase())
        }
    }
    render() {
        const query = this.props.query
        // const props.location.state.input
        const { errorMsg, loading, search, results, error, nothing, column, direction, input } = this.state
        const { hInput, hSubmit, searchBegin } = this
        const empty = !results.length
        const inputEmpty = input.lenght == 0
        let message
        let searchIcon
        let inputLoading = false
        if (nothing) {
            searchIcon = 'search'
            message = isIntro
        } else if (error) {
            message = isError(errorMsg)
            searchIcon = 'x'
        } else if (loading) {
            message = isLoading
            searchIcon = 'circle notched'
            inputLoading = true
        } else if (empty) {
            message = isNothing(search)
            searchIcon = 'undo'
        } else {
            searchIcon = 'search'
            message = hasLoaded(results.length)
        }
        const pageTitle = query?query: "Torrentz2"
        return (
            <Layout>
                <SEO title={pageTitle}></SEO>
                <Segment>
                    <Input onChange={hInput} value={input} onKeyPress={hSubmit} fluid loading={inputLoading} icon={searchIcon} iconPosition='left' action={<Button onClick={searchBegin}>Search</Button>} placeholder='Search Torrents' />
                </Segment>
                {message}
                {!nothing && <Table striped compact sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'title' ? direction : null}
                                onClick={this.handleSort('title')}
                            >Name</Table.HeaderCell>
                            <Table.HeaderCell collapsing
                                sorted={column === 'seeds' ? direction : null}
                                onClick={this.handleSort('seeds')}
                            >Seeds</Table.HeaderCell>
                            <Table.HeaderCell collapsing
                                sorted={column === 'number' ? direction : null}
                                onClick={this.handleSort('number')}
                            >Size</Table.HeaderCell>
                            <Table.HeaderCell collapsing>Torrent</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {results.map((x, i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.Cell><span className="show-mobile"></span><span style={{"overflowWrap": "anywhere"}}>{x.title}</span></Table.Cell>
                                    <Table.Cell><span className="show-mobile">Seeds: </span>{x.seeds}</Table.Cell>
                                    <Table.Cell><span className="show-mobile">Size: </span>{x.size}</Table.Cell>
                                    <Table.Cell><a href={x.magnet}><span><img className='center-magnet' style={{display:"inline", 'marginBottom': 0, 'marginRight': '4px'}} src={magnets} />Magnet Link</span></a></Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>}
            </Layout>
        )
    }
}

const ClientRoutes = props => (
    <Location>
        {({ location }) => (
            <Router location={location} className="router">
                {props.children}
            </Router>
        )}
    </Location>
)

const Page = props => (
    <div>
        {props.page}
    </div>
)

const Routed = () => (
    <ClientRoutes>
        <IndexPage path="/search/:query" />
        <IndexPage path="/search/" />
        <IndexPage path="/" />
    </ClientRoutes>
)


export default Routed
