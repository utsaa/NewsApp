import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps= {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes={
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  articles = [];
  constructor(props) {
    super(props);
    console.log("Hello I am a Constructor in news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title=`${this.props.category.toUpperCase()} - NewsMonkey`;
  }

  update = async ()=>{
    this.props.setProgress(0);
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data=await fetch(url);
    let parseData= await data.json();
    // this.setState({articles: parseData.articles});
    console.log('data:', parseData)
    this.setState({loading: false});
    this.setState({
      page: this.state.page,
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
    this.props.setProgress(100);
    console.log(this.state.totalResults, this.state.page);
    console.log(url);

  }

  async componentDidMount(){
    console.log("cdm");
    this.update();
    


  }

  // handlePrev = async ()=>{
  //   console.log('prev');
    
  //   this.setState({page: this.state.page-1 });
  //   this.update();
  
  // }

  // handleNext= async ()=>{
  //   console.log('next');
  //   if (!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   {
    
  //   this.setState({page: this.state.page+1 });
  //   this.update();
  // }
  // };

  fetchMoreData = async () => {
    this.setState({page: this.state.page+1});
    
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    let data=await fetch(url);
    let parseData= await data.json();
    // this.setState({articles: parseData.articles});
    
    // this.setState({loading: false});
    this.setState({
      page: this.state.page,
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  render() {
    console.log("I am in render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey-Top headlines</h1>
        {/* <div className="text-center">
        {this.state.loading && <Spinner/>}
        </div> */}
        {console.log(this.state)}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<div className="text-center my-3"><Spinner/></div>}
        >
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return( 
            <div className="col-md-4" key={element.url}>
              <NewsItem
              
                title={element.title?element.title.slice(0,45):''}
                description={element.description?element.description.slice(0,88):""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author= {element.author}
                date={element.publishedAt}
              />
            </div>);
          })}
        </div>
        </InfiniteScroll>
        
        

        </div>
      
    );
  }
}

export default News;
