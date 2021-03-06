import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import {tryParseInt,ObjectAssign} from './utils';

const propTypes = {
    clsPrefix: PropTypes.string,
    rowStyle: PropTypes.object,
    rows: PropTypes.array,
}

const grap = 16;//偏移数值

class TableHeader extends Component{

  constructor(props){
    super(props);
    this.currentObj = null;
    this.state = {
      border:false
    }
    //拖拽宽度处理
    if(!props.dragborder)return;
    this.border = false;
    this.theadKey = new Date().getTime();
    this.drag = {
      initPageLeftX:0,
      initLeft:0,
      x:0,
      width:0,
    }
    // let _da = {};
    // Object.assign(_da,this.props.rows[0]);
    // this.drag.data = JSON.parse(JSON.stringify(this.props.rows[0]));
    // let a = this.props.rows[0];
   
    let _row = [];
    this.props.rows[0].forEach(item => {
      let newItem = item.key != "checkbox"?ObjectAssign(item):item;
      _row.push(newItem);
    });
    this.drag.data = _row;//JSON.parse(JSON.stringify(this.props.rows[0]));

  }

  shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  }

  onDragStart=(event,data)=>{
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("Text",data.key);
    this.currentObj = data;
    event.dataTransfer.setDragImage(event.target, 0, 0);
    this.props.onDragStart(event,data);
  }
  
  onDragOver=(event,data)=>{
    if(!this.currentObj || this.currentObj.key == data.key)return;
    event.preventDefault();
    this.props.onDragOver(event,data);
  }

  onDragEnter=(event,data)=>{
    if(!this.currentObj || this.currentObj.key == data.key)return;
    this.props.onDragEnter(event,data);
  }

  onDrop=(event,data)=>{
    if(!this.currentObj ||this.currentObj.key == data.key)return;
    this.props.onDrop(event,data);
  }


  onMouseMove=(event,data)=>{
    if(this.border)return; 
    const {clsPrefix} = this.props; 
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap-hover`;
  }
  onMouseOut=(event,data)=>{
    if(this.border)return;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onMouseDown=(event,data)=>{
    this.border = true;
    const {clsPrefix} = this.props; 
    this.drag.initPageLeftX = event.pageX;
    this.drag.initLeft = tryParseInt(event.target.style.left);
    this.drag.x = this.drag.initLeft;
    this.drag.currIndex = this.props.rows[0].findIndex(da=>da.key==data.key);
    this.drag.width = this.drag.data[this.drag.currIndex].width;
  }
  onMouseUp=(event,data)=>{
    this.border = false;
    const {clsPrefix} = this.props;
    event.target.className = `${clsPrefix}-thead-th-drag-gap th-drag-gap`;
  }
  onThMouseUp=(event,data)=>{
    this.border = false;
  }
   
  onThMouseMove=(event,data)=>{ 
    if(!this.border)return;
    const {dragborderKey} = this.props;
    console.log(data);
    let x = (event.pageX - this.drag.initPageLeftX) + this.drag.initLeft-0;
    //设置hiden的left
    //"u-table-drag-hide-table"
    let currentHideDom = document.getElementById("u-table-drag-hide-table-"+dragborderKey).getElementsByTagName("div")[this.drag.currIndex];
    currentHideDom.style.left =  (this.drag.initPageLeftX+x-grap)+"px"; 

    //获取最小宽度，不让拖动
    // let minWidth = 0;
    // for(let i=0;i<=this.drag.currIndex;i++){
    //   minWidth += this.drag.data[i].width;
    // }
    
    // //判断最小值后在赋值 todo
    // let currLeft = this.drag.initPageLeftX+x-grap;
    // console.log("currLeft minWidth ",currLeft + " "+minWidth);
    // if(currLeft <= minWidth){
    //   return;
    // }
    // currentHideDom.style.left =  currLeft+"px"; 

    //设置当前的宽度 
    let  currentData = this.drag.data[this.drag.currIndex]; 
    currentData.width = this.drag.width + x; 
    let  currentDom = document.getElementById("u-table-drag-thead-"+this.theadKey).getElementsByTagName("th")[this.drag.currIndex];
    currentDom.style.width = (currentData.width)+"px"; 
    this.drag.x = x; 
  }
 
  render() {
    const { clsPrefix, rowStyle ,onDragStart,onDragOver,onDrop,draggable,rows,
      onMouseDown,onMouseMove,onMouseUp,dragborder,onMouseOut
      } = this.props;
    let attr = dragborder?{id:`u-table-drag-thead-${this.theadKey}`}:{}
    return (
      <thead className={`${clsPrefix}-thead`} {...attr}>
        {
          rows.map((row, index) => (
            <tr key={index} style={rowStyle}>
              {row.map((da, i) => {
                let thHover =  da.drgHover?` ${clsPrefix}-thead th-drag-hover`:""; 
                delete da.drgHover;
                if(draggable){
                  return ( <th {...da}
                    onDragStart={(event)=>{this.onDragStart(event,da)}} 
                    onDragOver={(event)=>{this.onDragOver(event,da)}}
                    onDrop={(event)=>{this.onDrop(event,da)}} 
                    onDragEnter={(event)=>{this.onDragEnter(event,da)}}
                    draggable={draggable}
                    className={`${da.className} ${clsPrefix}-thead th-drag ${thHover}`}
                    key={da.key} />)
                }else if(dragborder){
                    return(<th
                    style={{width:da.width,minWidth:da.width}}
                    onMouseMove={(event)=>{this.onThMouseMove(event,da)}}
                    onMouseUp={(event)=>{this.onThMouseUp(event,da)}}
                    className={`${da.className} ${clsPrefix}-thead-th `}
                    key={i} >
                      {da.children}
                    <div ref={el=>this.gap = el }
                      onMouseMove={(event)=>{this.onMouseMove(event,da)}}
                      onMouseOut={(event)=>{this.onMouseOut(event,da)}}
                      onMouseDown={(event)=>{this.onMouseDown(event,da)}}
                      onMouseUp={(event)=>{this.onMouseUp(event,da)}} 
                      className={`${clsPrefix}-thead-th-drag-gap `}></div>
                    </th>)
                }else{
                  let th = da.onClick?(<th {...da} key={i} onClick={(event)=>{da.onClick(da,event)}}/>):(<th {...da} key={i} />);
                  return (th);
                }
            })}
            </tr>
          ))
        }
      </thead>
    );
  }
};

TableHeader.propTypes = propTypes;

export default TableHeader;
