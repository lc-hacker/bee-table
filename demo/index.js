
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from '../src';
import Animate from 'bee-animate';
import Pagination from "bee-pagination";
import Icon from "bee-icon";
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import Input from 'bee-form-control';
import Popconfirm from 'bee-popconfirm';

const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


/**
*
* @title 简单表格
* @description
*
*/

const columns = [
  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },
  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },
  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },
  {
    title: '操作', dataIndex: '', key: 'd', render() {
      return <a href="#">一些操作</a>;
    },
  },
];

const data = [
  { a: '令狐冲', b: '男', c: 41, key: '1' },
  { a: '杨过', b: '男', c: 67, key: '2' },
  { a: '郭靖', b: '男', c: 25, key: '3' },
];

class Demo1 extends Component {
    render () {
        return (
              <Table
              columns={columns}
              data={data}
              title={currentData => <div>标题: 这是一个标题</div>}
              footer={currentData => <div>表尾: 我是小尾巴</div>}
              />
        )
    }
}
/**
*
* @title 无数据时显示
* @description 无数据时显示效果展示
*
*/

const columns10 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "30%"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ];
  
  const data10 = [
    
  ];

  const emptyFunc = () => <span>这里没有数据！</span>
  
  class Demo10 extends Component {
    render() {
      return <Table columns={columns10} data={data10} emptyText={emptyFunc} />;
    }
  }
  /**
*
* @title 增删改表格
* @description 这是带有增删改功能的表格
*
*/

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  handleKeydown = (event) => {
      console.log(event.keyCode);
      if(event.keyCode == 13){
          this.check();
      }

  }
  render() {
    const { value, editable } = this.state;
    return (<div className="editable-cell">
      {
        editable ?
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange}
            onKeyDown = {this.handleKeydown}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
        :
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <Icon
            type="uf-pencil"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
      }
    </div>);
  }
}

class Demo2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key:'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, {
      title: '年龄',
      dataIndex: 'age',
       key:'age',
    }, {
      title: '你懂的',
      dataIndex: 'address',
       key:'address',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm content="确认删除?" id='aa' onClose={this.onDelete(index)}>
              <Icon type="uf-del"></Icon>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: '沉鱼',
        age: '18',
        address: '96, 77, 89',
      }, {
        key: '1',
        name: '落雁',
        age: '16',
        address: '90, 70, 80',
      }, {
        key: '2',
        name: '闭月',
        age: '17',
        address: '80, 60, 80',
      }, {
        key: '3',
        name: '羞花',
        age: '20',
        address: '120, 60, 90',
      }],
      count: 4,
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index) => {
    return () => {
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);
      this.setState({ dataSource });
    };
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `凤姐 ${count}`,
      age: 32,
      address: `100 100 100`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  getBodyWrapper = (body) => {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (<div>
      <Button className="editable-add-btn" type="ghost" onClick={this.handleAdd}>添加</Button>
      <Table bordered data={dataSource} columns={columns} getBodyWrapper={this.getBodyWrapper} />
    </div>);
  }
}
/**
*
* @title 更灵活的表格
* @description 手写表格的头组件来达到更灵活的配置表格
*
*/

const { ColumnGroup, Column } = Table;

const data3 = [
  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },
];

class Demo3 extends Component {
    render () {
        return (

  <Table data={data3}>
    <ColumnGroup title="地址">
      <Column
        title="省"
        dataIndex="a"
        key="a"
        width={100}
      />
      <Column
        id="123"
        title="市"
        dataIndex="b"
        key="b"
        width={100}
      />
    </ColumnGroup>
    <Column
      title="数量"
      dataIndex="c"
      key="c"
      width={200}
    />
    <Column
      title="操作"
      dataIndex=""
      key="d"
      render={(text, record, index) => {
        return (
            <Button size="sm" colors="info" style={{ minWidth: 50 }}>增加</Button>
        );
      }}
    />
  </Table>
        )
    }
}
/**
*
* @title 树形数据展示
* @description 手写表格的头组件来达到更灵活的配置表格
*
*/

const columns4 = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "40%"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "30%"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

const data4 = [
  {
    key: 1,
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park"
      },
      {
        key: 12,
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park"
          }
        ]
      },
      {
        key: 13,
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park"
              },
              {
                key: 1312,
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];
class Demo4 extends Component {
  render() {
    return <Table columns={columns4} data={data4} />;
  }
}
/**
*
* @title 固定列
* @description 固定列到表格的某侧
*
*/

const columns5 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" }
];

const data5 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  }
];

class Demo5 extends Component {
  render() {
    return <Table columns={columns5} data={data5} scroll={{ x: 1500 }} />;
  }
}
/**
*
* @title 固定表头
* @description 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。
*
*/

const columns6 = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name"
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age"},
  { title: "Column 1", dataIndex: "address", key: "1" },
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" }
];

const data6 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "3",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "4",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },{
    key: "11",
    name: "John Brown",
    age: 32,
    address: "New York Park"
  },
  {
    key: "12",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "13",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  },
  {
    key: "14",
    name: "Jim Green",
    age: 40,
    address: "London Park"
  }
];

class Demo6 extends Component {
  render() {
    return <Table columns={columns6} data={data6} scroll={{ y: 150 }} />;
  }
}
/**
*
* @title 主子表
* @description 主表点击子表联动
*
*/

const columns7 = [
  { title: "用户名", dataIndex: "a", key: "a"},
  { id: "123", title: "性别", dataIndex: "b", key: "b"},
  { title: "年龄", dataIndex: "c", key: "c"},
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

const data7 = [
  { a: "令狐冲", b: "男", c: 41, key: "1" },
  { a: "杨过", b: "男", c: 67, key: "2" },
  { a: "郭靖", b: "男", c: 25, key: "3" }
];

const columns7_1 = [
  { title: "用户名", dataIndex: "a", key: "a"},
  { id: "123", title: "班级", dataIndex: "b", key: "b"},
  { title: "系别", dataIndex: "c", key: "c"}
];

class Demo7 extends Component {
  constructor(props){
    super(props);
    this.state = {
      children_data : []
    }
  }
  rowclick = (record, index) => {
    console.log(record)
    console.log(index)
    if(record.a === '令狐冲'){
      this.setState({
        children_data: [
          { a: "令狐冲", b: "01班", c: '文学系', key: "1" },
        ]
      })
    }else if(record.a === '杨过'){
      this.setState({
        children_data: [
          { a: "杨过", b: "01班", c: '外语系', key: "2" },
        ]
      })
    }else if(record.a === '郭靖'){
      this.setState({
        children_data: [
          { a: "郭靖", b: "02班", c: '美术系', key: "3" }
        ]
      })
    }
  }
  render() {
    return (
      <div>
        <Table
          columns={columns7_1}
          data={data7}
          onRowClick={this.rowclick}
          title={currentData => <div>标题: 我是主表</div>}
        />
        <Table
          columns={columns7}
          data={this.state.children_data}
          title={currentData => <div>标题: 我是子表</div>}
        />
      </div>
    );
  }
}
/**
*
* @title 表格+分页
* @description 点击分页联动表格
*
*/
const columns8 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

class Demo8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data8: [
        { a: "令狐冲", b: "男", c: 41, key: "1" },
        { a: "杨过", b: "男", c: 67, key: "2" },
        { a: "郭靖", b: "男", c: 25, key: "3" }
      ],
      activePage: 1
    };
  }
  handleSelect(eventKey) {
    if(eventKey === 1){
      this.setState({
        data8: [
          { a: "令狐冲", b: "男", c: 41, key: "1" },
          { a: "杨过", b: "男", c: 67, key: "2" },
          { a: "郭靖", b: "男", c: 25, key: "3" }
        ],
        activePage: eventKey
      });
    }else{
      this.setState({
        data8: [
          { a: "芙蓉姐姐", b: "女", c: 23, key: "1" }
        ],
        activePage: eventKey
      });
    }
    
  }
  render() {
    return (
      <div>
        <Table columns={columns8} data={this.state.data8} />
       <Pagination
	        	first
	        	last
	        	prev
	        	next
	        	boundaryLinks
		        items={2}
		        maxButtons={5}
		        activePage={this.state.activePage}
		        onSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}
/**
*
* @title 表格+搜索
* @description 搜索刷新表格数据
*
*/

class Search extends Component {
  state = {
    searchValue: "",
    empty: false
  };

  /**
   * 搜索
   */
  handleSearch = () => {
    let { onSearch,handleToChange } = this.props;
    handleToChange && handleToChange();
    onSearch && onSearch(this.state.searchValue);
  };

  /**
   * 捕获回车
   * @param e
   */
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };

  /**
   * 输入框改变
   * @param e
   */
  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  /**
   * 清空输入框
   */
  emptySearch = () => {
    let { onEmpty } = this.props;
    this.setState({
      searchValue: "",
      empty: false
    });
    onEmpty && onEmpty();
  };

  render() {
    return (
      <InputGroup simple className="search-component">
        <FormControl
          onChange={this.handleChange}
          value={this.state.searchValue}
          onKeyDown={this.handleKeyDown}
          type="text"
        />
        {this.state.empty
          ? <Icon
              type="uf-close-c"
              onClick={this.emptySearch}
              className="empty-search"
            />
          : null}

        <InputGroup.Button onClick={this.handleSearch} shape="border">
          <Icon type="uf-search" />
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default Search;
const columns9 = [
  { title: "用户名", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "性别", dataIndex: "b", key: "b", width: 100 },
  { title: "年龄", dataIndex: "c", key: "c", width: 200 },
  {
    title: "操作",
    dataIndex: "",
    key: "d",
    render() {
      return <a href="#">一些操作</a>;
    }
  }
];

class Demo9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { a: "令狐冲", b: "男", c: 41, key: "1" },
        { a: "杨过", b: "男", c: 67, key: "2" },
        { a: "郭靖", b: "男", c: 25, key: "3" }
      ]
    };
  }
  handleSearchToTable=()=>{
    this.setState({
      data: [
        { a: "令狐冲", b: "男", c: 41, key: "1" }
      ]
    })
  }
  render() {
    return (
      <div>
        <div className="clearfix">
          <Search handleToChange={this.handleSearchToTable}/>
        </div>
        <Table columns={columns9} data={this.state.data} />
      </div>
    );
  }
}
var DemoArray = [{"example":<Demo1 />,"title":" 简单表格","code":"/**\n*\n* @title 简单表格\n* @description\n*\n*/\n\nconst columns = [\n  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },\n  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },\n  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },\n  {\n    title: '操作', dataIndex: '', key: 'd', render() {\n      return <a href=\"#\">一些操作</a>;\n    },\n  },\n];\n\nconst data = [\n  { a: '令狐冲', b: '男', c: 41, key: '1' },\n  { a: '杨过', b: '男', c: 67, key: '2' },\n  { a: '郭靖', b: '男', c: 25, key: '3' },\n];\n\nclass Demo1 extends Component {\n    render () {\n        return (\n              <Table\n              columns={columns}\n              data={data}\n              title={currentData => <div>标题: 这是一个标题</div>}\n              footer={currentData => <div>表尾: 我是小尾巴</div>}\n              />\n        )\n    }\n}\n","desc":""},{"example":<Demo10 />,"title":" 无数据时显示","code":"/**\n*\n* @title 无数据时显示\n* @description 无数据时显示效果展示\n*\n*/\n\nconst columns10 = [\n    {\n      title: \"Name\",\n      dataIndex: \"name\",\n      key: \"name\",\n      width: \"40%\"\n    },\n    {\n      title: \"Age\",\n      dataIndex: \"age\",\n      key: \"age\",\n      width: \"30%\"\n    },\n    {\n      title: \"Address\",\n      dataIndex: \"address\",\n      key: \"address\"\n    }\n  ];\n  \n  const data10 = [\n    \n  ];\n\n  const emptyFunc = () => <span>这里没有数据！</span>\n  \n  class Demo10 extends Component {\n    render() {\n      return <Table columns={columns10} data={data10} emptyText={emptyFunc} />;\n    }\n  }\n  ","desc":" 无数据时显示效果展示"},{"example":<Demo2 />,"title":" 增删改表格","code":"/**\n*\n* @title 增删改表格\n* @description 这是带有增删改功能的表格\n*\n*/\n\nclass EditableCell extends React.Component {\n  state = {\n    value: this.props.value,\n    editable: false,\n  }\n  handleChange = (e) => {\n    const value = e.target.value;\n    this.setState({ value });\n  }\n  check = () => {\n    this.setState({ editable: false });\n    if (this.props.onChange) {\n      this.props.onChange(this.state.value);\n    }\n  }\n  edit = () => {\n    this.setState({ editable: true });\n  }\n  handleKeydown = (event) => {\n      console.log(event.keyCode);\n      if(event.keyCode == 13){\n          this.check();\n      }\n\n  }\n  render() {\n    const { value, editable } = this.state;\n    return (<div className=\"editable-cell\">\n      {\n        editable ?\n        <div className=\"editable-cell-input-wrapper\">\n          <Input\n            value={value}\n            onChange={this.handleChange}\n            onKeyDown = {this.handleKeydown}\n          />\n          <Icon\n            type=\"uf-correct\"\n            className=\"editable-cell-icon-check\"\n            onClick={this.check}\n          />\n        </div>\n        :\n        <div className=\"editable-cell-text-wrapper\">\n          {value || ' '}\n          <Icon\n            type=\"uf-pencil\"\n            className=\"editable-cell-icon\"\n            onClick={this.edit}\n          />\n        </div>\n      }\n    </div>);\n  }\n}\n\nclass Demo2 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.columns = [{\n      title: '姓名',\n      dataIndex: 'name',\n      key:'name',\n      width: '30%',\n      render: (text, record, index) => (\n        <EditableCell\n          value={text}\n          onChange={this.onCellChange(index, 'name')}\n        />\n      ),\n    }, {\n      title: '年龄',\n      dataIndex: 'age',\n       key:'age',\n    }, {\n      title: '你懂的',\n      dataIndex: 'address',\n       key:'address',\n    }, {\n      title: '操作',\n      dataIndex: 'operation',\n      key: 'operation',\n      render: (text, record, index) => {\n        return (\n          this.state.dataSource.length > 1 ?\n          (\n            <Popconfirm content=\"确认删除?\" id='aa' onClose={this.onDelete(index)}>\n              <Icon type=\"uf-del\"></Icon>\n            </Popconfirm>\n          ) : null\n        );\n      },\n    }];\n\n    this.state = {\n      dataSource: [{\n        key: '0',\n        name: '沉鱼',\n        age: '18',\n        address: '96, 77, 89',\n      }, {\n        key: '1',\n        name: '落雁',\n        age: '16',\n        address: '90, 70, 80',\n      }, {\n        key: '2',\n        name: '闭月',\n        age: '17',\n        address: '80, 60, 80',\n      }, {\n        key: '3',\n        name: '羞花',\n        age: '20',\n        address: '120, 60, 90',\n      }],\n      count: 4,\n    };\n  }\n  onCellChange = (index, key) => {\n    return (value) => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  }\n  onDelete = (index) => {\n    return () => {\n      const dataSource = [...this.state.dataSource];\n      dataSource.splice(index, 1);\n      this.setState({ dataSource });\n    };\n  }\n  handleAdd = () => {\n    const { count, dataSource } = this.state;\n    const newData = {\n      key: count,\n      name: `凤姐 ${count}`,\n      age: 32,\n      address: `100 100 100`,\n    };\n    this.setState({\n      dataSource: [...dataSource, newData],\n      count: count + 1,\n    });\n  }\n\n  getBodyWrapper = (body) => {\n    return (\n      <Animate transitionName=\"move\" component=\"tbody\" className={body.props.className}>\n        {body.props.children}\n      </Animate>\n    );\n  }\n  render() {\n    const { dataSource } = this.state;\n    const columns = this.columns;\n    return (<div>\n      <Button className=\"editable-add-btn\" type=\"ghost\" onClick={this.handleAdd}>添加</Button>\n      <Table bordered data={dataSource} columns={columns} getBodyWrapper={this.getBodyWrapper} />\n    </div>);\n  }\n}\n","desc":" 这是带有增删改功能的表格"},{"example":<Demo3 />,"title":" 更灵活的表格","code":"/**\n*\n* @title 更灵活的表格\n* @description 手写表格的头组件来达到更灵活的配置表格\n*\n*/\n\nconst { ColumnGroup, Column } = Table;\n\nconst data3 = [\n  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },\n];\n\nclass Demo3 extends Component {\n    render () {\n        return (\n\n  <Table data={data3}>\n    <ColumnGroup title=\"地址\">\n      <Column\n        title=\"省\"\n        dataIndex=\"a\"\n        key=\"a\"\n        width={100}\n      />\n      <Column\n        id=\"123\"\n        title=\"市\"\n        dataIndex=\"b\"\n        key=\"b\"\n        width={100}\n      />\n    </ColumnGroup>\n    <Column\n      title=\"数量\"\n      dataIndex=\"c\"\n      key=\"c\"\n      width={200}\n    />\n    <Column\n      title=\"操作\"\n      dataIndex=\"\"\n      key=\"d\"\n      render={(text, record, index) => {\n        return (\n            <Button size=\"sm\" colors=\"info\" style={{ minWidth: 50 }}>增加</Button>\n        );\n      }}\n    />\n  </Table>\n        )\n    }\n}\n","desc":" 手写表格的头组件来达到更灵活的配置表格"},{"example":<Demo4 />,"title":" 树形数据展示","code":"/**\n*\n* @title 树形数据展示\n* @description 手写表格的头组件来达到更灵活的配置表格\n*\n*/\n\nconst columns4 = [\n  {\n    title: \"Name\",\n    dataIndex: \"name\",\n    key: \"name\",\n    width: \"40%\"\n  },\n  {\n    title: \"Age\",\n    dataIndex: \"age\",\n    key: \"age\",\n    width: \"30%\"\n  },\n  {\n    title: \"Address\",\n    dataIndex: \"address\",\n    key: \"address\"\n  }\n];\n\nconst data4 = [\n  {\n    key: 1,\n    name: \"John Brown sr.\",\n    age: 60,\n    address: \"New York No. 1 Lake Park\",\n    children: [\n      {\n        key: 11,\n        name: \"John Brown\",\n        age: 42,\n        address: \"New York No. 2 Lake Park\"\n      },\n      {\n        key: 12,\n        name: \"John Brown jr.\",\n        age: 30,\n        address: \"New York No. 3 Lake Park\",\n        children: [\n          {\n            key: 121,\n            name: \"Jimmy Brown\",\n            age: 16,\n            address: \"New York No. 3 Lake Park\"\n          }\n        ]\n      },\n      {\n        key: 13,\n        name: \"Jim Green sr.\",\n        age: 72,\n        address: \"London No. 1 Lake Park\",\n        children: [\n          {\n            key: 131,\n            name: \"Jim Green\",\n            age: 42,\n            address: \"London No. 2 Lake Park\",\n            children: [\n              {\n                key: 1311,\n                name: \"Jim Green jr.\",\n                age: 25,\n                address: \"London No. 3 Lake Park\"\n              },\n              {\n                key: 1312,\n                name: \"Jimmy Green sr.\",\n                age: 18,\n                address: \"London No. 4 Lake Park\"\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  },\n  {\n    key: 2,\n    name: \"Joe Black\",\n    age: 32,\n    address: \"Sidney No. 1 Lake Park\"\n  }\n];\nclass Demo4 extends Component {\n  render() {\n    return <Table columns={columns4} data={data4} />;\n  }\n}\n","desc":" 手写表格的头组件来达到更灵活的配置表格"},{"example":<Demo5 />,"title":" 固定列","code":"/**\n*\n* @title 固定列\n* @description 固定列到表格的某侧\n*\n*/\n\nconst columns5 = [\n  {\n    title: \"Full Name\",\n    width: 100,\n    dataIndex: \"name\",\n    key: \"name\",\n    fixed: \"left\"\n  },\n  { title: \"Age\", width: 100, dataIndex: \"age\", key: \"age\", fixed: \"left\" },\n  { title: \"Column 1\", dataIndex: \"address\", key: \"1\" },\n  { title: \"Column 2\", dataIndex: \"address\", key: \"2\" },\n  { title: \"Column 3\", dataIndex: \"address\", key: \"3\" },\n  { title: \"Column 4\", dataIndex: \"address\", key: \"4\" },\n  { title: \"Column 5\", dataIndex: \"address\", key: \"5\" },\n  { title: \"Column 6\", dataIndex: \"address\", key: \"6\" },\n  { title: \"Column 7\", dataIndex: \"address\", key: \"7\" },\n  { title: \"Column 8\", dataIndex: \"address\", key: \"8\" }\n];\n\nconst data5 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  }\n];\n\nclass Demo5 extends Component {\n  render() {\n    return <Table columns={columns5} data={data5} scroll={{ x: 1500 }} />;\n  }\n}\n","desc":" 固定列到表格的某侧"},{"example":<Demo6 />,"title":" 固定表头","code":"/**\n*\n* @title 固定表头\n* @description 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。\n*\n*/\n\nconst columns6 = [\n  {\n    title: \"Full Name\",\n    width: 100,\n    dataIndex: \"name\",\n    key: \"name\"\n  },\n  { title: \"Age\", width: 100, dataIndex: \"age\", key: \"age\"},\n  { title: \"Column 1\", dataIndex: \"address\", key: \"1\" },\n  { title: \"Column 2\", dataIndex: \"address\", key: \"2\" },\n  { title: \"Column 3\", dataIndex: \"address\", key: \"3\" },\n  { title: \"Column 4\", dataIndex: \"address\", key: \"4\" },\n  { title: \"Column 5\", dataIndex: \"address\", key: \"5\" },\n  { title: \"Column 6\", dataIndex: \"address\", key: \"6\" },\n  { title: \"Column 7\", dataIndex: \"address\", key: \"7\" },\n  { title: \"Column 8\", dataIndex: \"address\", key: \"8\" }\n];\n\nconst data6 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },{\n    key: \"11\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"12\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"13\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"14\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  }\n];\n\nclass Demo6 extends Component {\n  render() {\n    return <Table columns={columns6} data={data6} scroll={{ y: 150 }} />;\n  }\n}\n","desc":" 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。"},{"example":<Demo7 />,"title":" 主子表","code":"/**\n*\n* @title 主子表\n* @description 主表点击子表联动\n*\n*/\n\nconst columns7 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\"},\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\"},\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\"},\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nconst data7 = [\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n];\n\nconst columns7_1 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\"},\n  { id: \"123\", title: \"班级\", dataIndex: \"b\", key: \"b\"},\n  { title: \"系别\", dataIndex: \"c\", key: \"c\"}\n];\n\nclass Demo7 extends Component {\n  constructor(props){\n    super(props);\n    this.state = {\n      children_data : []\n    }\n  }\n  rowclick = (record, index) => {\n    console.log(record)\n    console.log(index)\n    if(record.a === '令狐冲'){\n      this.setState({\n        children_data: [\n          { a: \"令狐冲\", b: \"01班\", c: '文学系', key: \"1\" },\n        ]\n      })\n    }else if(record.a === '杨过'){\n      this.setState({\n        children_data: [\n          { a: \"杨过\", b: \"01班\", c: '外语系', key: \"2\" },\n        ]\n      })\n    }else if(record.a === '郭靖'){\n      this.setState({\n        children_data: [\n          { a: \"郭靖\", b: \"02班\", c: '美术系', key: \"3\" }\n        ]\n      })\n    }\n  }\n  render() {\n    return (\n      <div>\n        <Table\n          columns={columns7_1}\n          data={data7}\n          onRowClick={this.rowclick}\n          title={currentData => <div>标题: 我是主表</div>}\n        />\n        <Table\n          columns={columns7}\n          data={this.state.children_data}\n          title={currentData => <div>标题: 我是子表</div>}\n        />\n      </div>\n    );\n  }\n}\n","desc":" 主表点击子表联动"},{"example":<Demo8 />,"title":" 表格+分页","code":"/**\n*\n* @title 表格+分页\n* @description 点击分页联动表格\n*\n*/\nconst columns8 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nclass Demo8 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data8: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n        { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n        { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n      ],\n      activePage: 1\n    };\n  }\n  handleSelect(eventKey) {\n    if(eventKey === 1){\n      this.setState({\n        data8: [\n          { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n          { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n          { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n        ],\n        activePage: eventKey\n      });\n    }else{\n      this.setState({\n        data8: [\n          { a: \"芙蓉姐姐\", b: \"女\", c: 23, key: \"1\" }\n        ],\n        activePage: eventKey\n      });\n    }\n    \n  }\n  render() {\n    return (\n      <div>\n        <Table columns={columns8} data={this.state.data8} />\n       <Pagination\n\t        \tfirst\n\t        \tlast\n\t        \tprev\n\t        \tnext\n\t        \tboundaryLinks\n\t\t        items={2}\n\t\t        maxButtons={5}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n      </div>\n    );\n  }\n}\n","desc":" 点击分页联动表格"},{"example":<Demo9 />,"title":" 表格+搜索","code":"/**\n*\n* @title 表格+搜索\n* @description 搜索刷新表格数据\n*\n*/\n\nclass Search extends Component {\n  state = {\n    searchValue: \"\",\n    empty: false\n  };\n\n  /**\n   * 搜索\n   */\n  handleSearch = () => {\n    let { onSearch,handleToChange } = this.props;\n    handleToChange && handleToChange();\n    onSearch && onSearch(this.state.searchValue);\n  };\n\n  /**\n   * 捕获回车\n   * @param e\n   */\n  handleKeyDown = e => {\n    if (e.keyCode === 13) {\n      this.handleSearch();\n    }\n  };\n\n  /**\n   * 输入框改变\n   * @param e\n   */\n  handleChange = e => {\n    this.setState({\n      searchValue: e.target.value\n    });\n  };\n\n  /**\n   * 清空输入框\n   */\n  emptySearch = () => {\n    let { onEmpty } = this.props;\n    this.setState({\n      searchValue: \"\",\n      empty: false\n    });\n    onEmpty && onEmpty();\n  };\n\n  render() {\n    return (\n      <InputGroup simple className=\"search-component\">\n        <FormControl\n          onChange={this.handleChange}\n          value={this.state.searchValue}\n          onKeyDown={this.handleKeyDown}\n          type=\"text\"\n        />\n        {this.state.empty\n          ? <Icon\n              type=\"uf-close-c\"\n              onClick={this.emptySearch}\n              className=\"empty-search\"\n            />\n          : null}\n\n        <InputGroup.Button onClick={this.handleSearch} shape=\"border\">\n          <Icon type=\"uf-search\" />\n        </InputGroup.Button>\n      </InputGroup>\n    );\n  }\n}\n\nexport default Search;\nconst columns9 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nclass Demo9 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n        { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n        { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n      ]\n    };\n  }\n  handleSearchToTable=()=>{\n    this.setState({\n      data: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" }\n      ]\n    })\n  }\n  render() {\n    return (\n      <div>\n        <div className=\"clearfix\">\n          <Search handleToChange={this.handleSearchToTable}/>\n        </div>\n        <Table columns={columns9} data={this.state.data} />\n      </div>\n    );\n  }\n}\n","desc":" 搜索刷新表格数据"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        const header = (
            <Row>
                <Col md={12}>
                { example }
                </Col>
            </Row>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
