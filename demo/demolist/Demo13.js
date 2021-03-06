/**
 *
 * @title 列排序、全选功能、合计
 * @description 列排序、全选功能、合计（通过使用的封装好的功能方法实现复杂功能，简单易用！）新增回调函数(sorterClick)
 *
 */

import React, { Component } from "react";
import Table from "../../src";
import Checkbox from "bee-checkbox";
import Button from "bee-button";
import Icon from "bee-icon";
import multiSelect from "../../src/lib/multiSelect.js";
import sort from "../../src/lib/sort.js";
import sum from "../../src/lib/sum.js";

const columns13 = [
  {
    title: "名字",
    dataIndex: "a",
    key: "a",
    width: 200
  },
  {
    title: "功力指数",
    dataIndex: "b",
    key: "b",
    width: 200,
    sumCol: true,
    order:"ascend",
    sorter: (a, b) => a.c - b.c,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "年龄",
    dataIndex: "c",
    key: "c",
    width: 200,
    order:"descend",
    sumCol: true,
    sorter: (a, b) => a.c - b.c,
    sorterClick:(data,type)=>{//排序的回调函数
      //type value is up or down
      console.log("data",data);
    }
  },
  {
    title: "武功级别",
    dataIndex: "d",
    key: "d",
    width: 200
  }
];

const data13 = [
  { a: "杨过", b: 675, c: 30, d: "内行", key: "2" },
  { a: "令狐冲", b: 43, c: 41, d: "大侠", key: "1" },
  { a: "郭靖", b: 153, c: 25, d: "大侠", key: "3" }
];
const data13_1 = [
  { a: "杨过", b: "男", c: 30, d: "内行", key: "2" },
  { a: "杨过", b: "男", c: 30, d: "内行", key: "22" },
  { a: "杨过", b: "男", c: 30, d: "内行", key: "222" },
  { a: "令狐冲", b: "男", c: 41, d: "大侠", key: "1" },
  { a: "郭靖", b: "男", c: 25, d: "大侠", key: "3" }
];
//拼接成复杂功能的table组件不能在render中定义，需要像此例子声明在组件的外侧，不然操作state会导致功能出现异常
let ComplexTable = multiSelect(sum(sort(Table, Icon)), Checkbox);

class Demo13 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data13: data13,
      selectedRow: this.selectedRow,
      selectDisabled: this.selectDisabled
    };
  }
  getSelectedDataFunc = data => {
    console.log(data);
  };
  selectDisabled = (record, index) => {
    // console.log(record);
    if (index === 1) {
      return true;
    }
    return false;
  };
  selectedRow = (record, index) => {
    // console.log(record);
    if (index === 0) {
      return true;
    }
    return false;
  };
  onClick = () => {
    this.setState({
      selectedRow: function() {}
    });
  };

  render() {
    let multiObj = {
      type: "checkbox"
    };
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.onClick}>
          change selectedRow
        </Button>
        <ComplexTable
          selectDisabled={this.state.selectDisabled}
          selectedRow={this.state.selectedRow}
          columns={columns13}
          data={this.state.data13}
          multiSelect={multiObj}
          getSelectedDataFunc={this.getSelectedDataFunc}
        />
      </div>
    );
  }
}
export default Demo13;
