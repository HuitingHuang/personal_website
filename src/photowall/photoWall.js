import React, { Component } from 'react';
import { HashRouter as Router,Switch,Route,Link} from 'react-router-dom';
import './photoWall.css';
import musicIcon from './music.png';
import rainbow from './rainbow.mp3';
import firstSight from './FirstSight.mp3';
import top from './top.png';
import arrow from './arrow.png';
import back from './back.png';
// import $ from 'jquery';

const requireContext = require.context("./testPhotos",false, /^\.\/.*\.jpg$/);
const testPhotos = requireContext.keys().map(requireContext);

class PhotoWall extends Component{
    constructor(props){
        super(props);

        // this.getRandomSize = this.getRandomSize.bind(this);
        // this.renderDivs = this.renderDivs.bind(this);
        this.imgClick = this.imgClick.bind(this);
        this.closeOneImg = this.closeOneImg.bind(this);
        this.musicPlay = this.musicPlay.bind(this);
        this.backToTop = this.backToTop.bind(this);
        this.test = this.test.bind(this);
        this.nextPhoto = this.nextPhoto.bind(this);
        this.arrowAppear = this.arrowAppear.bind(this);
        this.darkBackground = this.darkBackground.bind(this);

        this.state ={
            oneImgSrc:null,
            oneImgInd:0,
            oneImgVisible:'none',
            audioPlay:true,
            imgHeight:'80%',
            arrowL:'none',
            arrowR:'none',
        }
    }

    test(){
        alert('Goodbye my princess.')
    }
    
    darkBackground = (e) =>{
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let testDiv = document.getElementById('testDiv');
        let img = document.getElementById('imgBigger');
        if((mouseX <= parseInt(testDiv.offsetLeft))||
            (mouseX >= (parseInt(testDiv.offsetLeft) + parseInt(img.width)))||
            (mouseY <= parseInt(testDiv.offsetTop))||
            (mouseY >= (parseInt(testDiv.offsetTop) + parseInt(img.height)))
        ){
            this.setState({
                arrowR:'none',
                arrowL:'none'
            });
        }
    }
    arrowAppear =(e) =>{
        let mouseX = e.clientX;
        
        if (mouseX <= parseInt(document.getElementById('testDiv').offsetLeft) + parseInt(document.getElementById('imgBigger').width) / 4){
            this.setState({
                arrowL:'block'
            });
        }else if(mouseX>= parseInt(document.getElementById('testDiv').offsetLeft) + parseInt(document.getElementById('imgBigger').width) / 4*3){
            this.setState({
                arrowR:'block'
            });
        }else{
            this.setState({
                arrowL:'none',
                arrowR:'none'
            })
            
        }   
    }

    // getRandomSize(min, max) {
    //     return Math.round(Math.random() * (max - min) + min);
    // }

    componentDidMount(){
    //    this.refs.audio.play();
        
    }

    // renderDivs = () =>{
        
    //     let divArray = [];
    //     for(let i=0;i<1;i++){
    //         let width = this.getRandomSize(200,400);
    //         let height = this.getRandomSize(200,400);
    //         console.log(width.toString(),height.toString())
            
    //         divArray.push(
    //             <div id={'div'+i} style={{width:width+'px',height:height+'px',border:'1px solid black'}}>
    //                 <img className='testIMG' src={testPhotos[i]} alt='test'></img>
    //             </div>
    //         )
    //     }
    //     return divArray;
    // }
    
    imgClick = (e) =>{
        this.setState({
            oneImgSrc:e.target.getAttribute("src"),
            oneImgInd:e.target.getAttribute('index'),
            oneImgVisible:'flex'
        });
        
        // console.log(e.target.getAttribute("index"));

        if(e.target.height>e.target.width){
            this.setState({
                imgHeight:'90%'
            });
        }else if(e.target.height<=e.target.width){
            this.setState({
                imgHeight:'75%'
            });
        }
    }

    closeOneImg = () =>{
        this.setState({
            oneImgVisible:'none',
            arrowL:'hidden',
            arrowR:'hidden'
        });
    }

    musicPlay = () =>{
        if(this.state.audioPlay){
            this.refs.audio.pause();
            this.refs.music.style.webkitAnimationInteractionCount = '0';
            this.refs.music.style.webkitAnimationPlayState = 'paused';
        }else{
            this.refs.audio.play();
            this.refs.music.style.webkitAnimationInteractionCount = 'infinite';
            this.refs.music.style.webkitAnimationPlayState = 'running';
        }

        this.setState({
            audioPlay:!this.state.audioPlay
        })
    }

    backToTop = () =>{
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        var timer = null;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn(){
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(oTop > 0){
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
                timer = requestAnimationFrame(fn);
            }else{
                cancelAnimationFrame(timer);
            } 
        });

    }

    nextPhoto = () =>{
        // console.log('img'+(parseInt(this.state.oneImgInd)+1))
        
        if(this.state.oneImgInd<testPhotos.length-1){
            let height = document.getElementById('img'+(parseInt(this.state.oneImgInd)+1)).height;
            let width = document.getElementById('img'+(parseInt(this.state.oneImgInd)+1)).width;

            this.setState(prevState=>({
                oneImgSrc:testPhotos[parseInt(prevState.oneImgInd)+1],
                oneImgInd:parseInt(prevState.oneImgInd)+1,
                imgHeight:height > width ? '90%':'70%'
            }));
        }else{
            alert('已经是最后一张了')
            return;
        }
        
    }
    lastPhoto = () =>{
        
        if(this.state.oneImgInd>0){
            let height = document.getElementById('img'+(parseInt(this.state.oneImgInd)-1)).height;
            let width = document.getElementById('img'+(parseInt(this.state.oneImgInd)-1)).width;

            this.setState(prevState=>({
                oneImgSrc:testPhotos[parseInt(prevState.oneImgInd)-1],
                oneImgInd:parseInt(prevState.oneImgInd)-1,
                imgHeight:height > width ? '90%':'70%'
            }));
        }else {
            alert('已经是第一张了')
            return;
        }
    }
    render(){
        return(
            
            <div id='photoWall' style={{width:'100%',height:'auto',background:'black'}}>
                <header id='topAnchor' style={{width:'100%'}}>
                    
                    <h2 style={{fontFamily:"Georgia",color:'#fff',display:'inline-block',width:'95%'}}><Link to='/'><img src={back} alt='返回' style={{verticalAlign:'middle'}}></img></Link>&nbsp;&nbsp;&nbsp;Emma's photo wall</h2>
                    <img className='music' ref='music' src={musicIcon} alt='无法显示图片' onClick={this.musicPlay} style={{verticalAlign:'middle'}}></img>
                </header>
                <audio id='audio' ref='audio' autoplay="autoplay" loop='loop' src={rainbow} type="audio/mpeg">浏览器不支持该音频格式</audio>
                <div id='gallery' style={{width:'100%',height:'auto',background:'rgb(0,0,0)',position:'relative'}}>
                    <section id='photos'>
                    {
                        testPhotos.map((data,index)=> {
                            return(
                                <img key={index} index={index} id={'img'+index} src={data} alt='test' onClick={this.imgClick}></img>
                            )
                        })
                    }
                        {/* {this.renderDivs()} */}
                    </section>
                </div>
                <div id='oneImg' style={{width:'100%',height:'100%',background:'rgba(0,0,0,0.5)',zIndex:'999',position:'fixed',top:'0',left:'0',display:this.state.oneImgVisible,justifyContent:'center',alignItems:'center'}} onMouseMove={this.darkBackground}>
                     <div id='testDiv' className='testDiv' style={{width:'auto',height:this.state.imgHeight,position:'fixed',}}>
                        <button id='btn-close' style={{position:'absolute',top:'1%',right:'1%'}} onClick={this.closeOneImg}>+</button>
                        <div className='arrow arrow-right' onClick={this.nextPhoto} style={{display:this.state.arrowR}}>
                            <img src={arrow} alt='arrow' style={{position:'relative',zIndex:'1000'}}></img>
                            <div className='arrow-bg'></div>
                        </div>
                        <div className='arrow arrow-left' onClick={this.lastPhoto} style={{display:this.state.arrowL}}>
                            <img src={arrow} alt='arrow' style={{position:'relative',zIndex:'1000'}}></img>
                            <div className='arrow-bg'></div>
                        </div>
                        <img id='imgBigger' className='imgBigger' index={this.state.oneImgInd} src={this.state.oneImgSrc} alt='picture' height='100%' /* style={{boxShadow:'0px 0px 15px 5px rgb(255, 255, 255)'}} */ onMouseMove={this.arrowAppear}></img>
                        
                     </div>
                </div>
                {/* anchor方法回到顶部 */}
                {/* <a href='#photoWall'style={{position:'fixed',zIndex:'2000',right:'2%',bottom:'2%'}}><img src={top} alt='Back to top'></img></a> */}
                {/* scrollTop方法回到顶部，可以增加动画 */}
                <img src={top} alt='Back to top' onClick={this.backToTop} style={{position:'fixed',zIndex:'2000',right:'2%',bottom:'2%'}}></img>
                
                <footer style={{textAlign:'center',width:'100%',padding:'2% 0'}}>Developed by Huiting Huang(Emma) 2019<br />Photo source: <a href='http://www.unsplash.com'>unsplash.com</a></footer>
                
            </div>
        );
    }
}

export default PhotoWall;