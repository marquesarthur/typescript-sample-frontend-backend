(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hello = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var helloFactory = function helloFactory(_ref) {
  var React = _ref.React;
  var _React$PropTypes = React.PropTypes;
  var string = _React$PropTypes.string;
  var func = _React$PropTypes.func;

  return function Hello(props) {

    // React wants propTypes & defaultProps
    // to be static.
    Hello.propTypes = {
      word: string,
      mode: string,

      actions: React.PropTypes.shape({
        setWord: func.isRequired,
        setMode: func.isRequired
      })
    };

    return {

      props: props, // set props

      componentDidUpdate: function componentDidUpdate() {
        this.refs.wordInput.getDOMNode().focus();
      },

      render: function render() {
        var _props = this.props;
        var word = _props.word;
        var mode = _props.mode;
        var _props$actions = this.props.actions;
        var setMode = _props$actions.setMode;
        var setWord = _props$actions.setWord;

        var styles = {
          displayMode: {
            display: mode === 'display' ? 'inline' : 'none'
          },

          editMode: {
            display: mode === 'edit' ? 'inline' : 'none'
          }
        };

        var onKeyUp = function onKeyUp(e) {
          if (e.key !== 'Enter') return;

          setWord(e.target.value);
          setMode('display');
        };

        return React.createElement(
          'p',
          null,
          'Hello, ',
          React.createElement(
            'span',
            {
              style: styles.displayMode,
              onClick: function () {
                return setMode('edit');
              }
            },
            word,
            '!'
          ),
          React.createElement('input', {
            ref: 'wordInput',
            style: styles.editMode,
            placeholder: word,
            onKeyUp: onKeyUp })
        );
      }
    };
  };
};

exports['default'] = helloFactory;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
