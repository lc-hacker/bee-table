'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  clsPrefix: _propTypes2["default"].string,
  rowStyle: _propTypes2["default"].object,
  rows: _propTypes2["default"].array
};

var grap = 16; //偏移数值

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onDragStart = function (event, data) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", data.key);
      _this.currentObj = data;
      event.dataTransfer.setDragImage(event.target, 0, 0);
      _this.props.onDragStart(event, data);
    };

    _this.onDragOver = function (event, data) {
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      event.preventDefault();
      _this.props.onDragOver(event, data);
    };

    _this.onDragEnter = function (event, data) {
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      _this.props.onDragEnter(event, data);
    };

    _this.onDrop = function (event, data) {
      if (!_this.currentObj || _this.currentObj.key == data.key) return;
      _this.props.onDrop(event, data);
    };

    _this.onMouseMove = function (event, data) {
      if (_this.border) return;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap-hover';
    };

    _this.onMouseOut = function (event, data) {
      if (_this.border) return;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap';
    };

    _this.onMouseDown = function (event, data) {
      _this.border = true;
      var clsPrefix = _this.props.clsPrefix;

      _this.drag.initPageLeftX = event.pageX;
      _this.drag.initLeft = (0, _utils.tryParseInt)(event.target.style.left);
      _this.drag.x = _this.drag.initLeft;
      _this.drag.currIndex = _this.props.rows[0].findIndex(function (da) {
        return da.key == data.key;
      });
      _this.drag.width = _this.drag.data[_this.drag.currIndex].width;
    };

    _this.onMouseUp = function (event, data) {
      _this.border = false;
      var clsPrefix = _this.props.clsPrefix;

      event.target.className = clsPrefix + '-thead-th-drag-gap th-drag-gap';
    };

    _this.onThMouseUp = function (event, data) {
      _this.border = false;
    };

    _this.onThMouseMove = function (event, data) {
      if (!_this.border) return;
      var dragborderKey = _this.props.dragborderKey;

      console.log(data);
      var x = event.pageX - _this.drag.initPageLeftX + _this.drag.initLeft - 0;
      //设置hiden的left
      //"u-table-drag-hide-table"
      var currentHideDom = document.getElementById("u-table-drag-hide-table-" + dragborderKey).getElementsByTagName("div")[_this.drag.currIndex];
      currentHideDom.style.left = _this.drag.initPageLeftX + x - grap + "px";

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
      var currentData = _this.drag.data[_this.drag.currIndex];
      currentData.width = _this.drag.width + x;
      var currentDom = document.getElementById("u-table-drag-thead-" + _this.theadKey).getElementsByTagName("th")[_this.drag.currIndex];
      currentDom.style.width = currentData.width + "px";
      _this.drag.x = x;
    };

    _this.currentObj = null;
    _this.state = {
      border: false
      //拖拽宽度处理
    };if (!props.dragborder) return _possibleConstructorReturn(_this);
    _this.border = false;
    _this.theadKey = new Date().getTime();
    _this.drag = {
      initPageLeftX: 0,
      initLeft: 0,
      x: 0,
      width: 0
      // let _da = {};
      // Object.assign(_da,this.props.rows[0]);
      // this.drag.data = JSON.parse(JSON.stringify(this.props.rows[0]));
      // let a = this.props.rows[0];

    };var _row = [];
    _this.props.rows[0].forEach(function (item) {
      var newItem = item.key != "checkbox" ? (0, _utils.ObjectAssign)(item) : item;
      _row.push(newItem);
    });
    _this.drag.data = _row; //JSON.parse(JSON.stringify(this.props.rows[0]));

    return _this;
  }

  TableHeader.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal2["default"])(nextProps, this.props);
  };

  TableHeader.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        clsPrefix = _props.clsPrefix,
        rowStyle = _props.rowStyle,
        onDragStart = _props.onDragStart,
        onDragOver = _props.onDragOver,
        onDrop = _props.onDrop,
        draggable = _props.draggable,
        rows = _props.rows,
        onMouseDown = _props.onMouseDown,
        onMouseMove = _props.onMouseMove,
        onMouseUp = _props.onMouseUp,
        dragborder = _props.dragborder,
        onMouseOut = _props.onMouseOut;

    var attr = dragborder ? { id: 'u-table-drag-thead-' + this.theadKey } : {};
    return _react2["default"].createElement(
      'thead',
      _extends({ className: clsPrefix + '-thead' }, attr),
      rows.map(function (row, index) {
        return _react2["default"].createElement(
          'tr',
          { key: index, style: rowStyle },
          row.map(function (da, i) {
            var thHover = da.drgHover ? ' ' + clsPrefix + '-thead th-drag-hover' : "";
            delete da.drgHover;
            if (draggable) {
              return _react2["default"].createElement('th', _extends({}, da, {
                onDragStart: function onDragStart(event) {
                  _this2.onDragStart(event, da);
                },
                onDragOver: function onDragOver(event) {
                  _this2.onDragOver(event, da);
                },
                onDrop: function onDrop(event) {
                  _this2.onDrop(event, da);
                },
                onDragEnter: function onDragEnter(event) {
                  _this2.onDragEnter(event, da);
                },
                draggable: draggable,
                className: da.className + ' ' + clsPrefix + '-thead th-drag ' + thHover,
                key: da.key }));
            } else if (dragborder) {
              return _react2["default"].createElement(
                'th',
                {
                  style: { width: da.width, minWidth: da.width },
                  onMouseMove: function onMouseMove(event) {
                    _this2.onThMouseMove(event, da);
                  },
                  onMouseUp: function onMouseUp(event) {
                    _this2.onThMouseUp(event, da);
                  },
                  className: da.className + ' ' + clsPrefix + '-thead-th ',
                  key: i },
                da.children,
                _react2["default"].createElement('div', { ref: function ref(el) {
                    return _this2.gap = el;
                  },
                  onMouseMove: function onMouseMove(event) {
                    _this2.onMouseMove(event, da);
                  },
                  onMouseOut: function onMouseOut(event) {
                    _this2.onMouseOut(event, da);
                  },
                  onMouseDown: function onMouseDown(event) {
                    _this2.onMouseDown(event, da);
                  },
                  onMouseUp: function onMouseUp(event) {
                    _this2.onMouseUp(event, da);
                  },
                  className: clsPrefix + '-thead-th-drag-gap ' })
              );
            } else {
              var th = da.onClick ? _react2["default"].createElement('th', _extends({}, da, { key: i, onClick: function onClick(event) {
                  da.onClick(da, event);
                } })) : _react2["default"].createElement('th', _extends({}, da, { key: i }));
              return th;
            }
          })
        );
      })
    );
  };

  return TableHeader;
}(_react.Component);

;

TableHeader.propTypes = propTypes;

exports["default"] = TableHeader;
module.exports = exports['default'];