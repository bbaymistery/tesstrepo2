//
import React from 'react'
const XLSX = require('xlsx')

const Button = (props) => {
  let { value, title, size, onClick, style, disabled, className, direction, href } = props;
  if (!size) { throw new Error('size attribute for Button is missing !!!') }
  title = title ? title : '';
  onClick = onClick ? onClick : () => { };
  value = value ? value : title;
  direction = direction === 'rtl' ? 'rtl' : 'ltr';
  size = ['s', 'm', 'l', 'xl'].indexOf(size) === -1 ? 's' : size;
  //
  return (
    <input type="submit" value={value} title={title} style={style ? style : {}} onClick={onClick} className={`customButton button-${size} ${direction} ${className}`} disabled={disabled} />
  )

}
//justify-content: space-between;gap:2rem;flex-grow:1
const Style = (props) => {
  return (
    <style>{`
.cp-datatable-table.cp-datatable-con {width:100%;}
div.cp-datatable-con { display: flex;flex-direction: column;justify-content: space-between;flex:1;}
div.cp-datatable-con * { font-size: 12px; }
table.cp-datatable-con > tbody > td > { white-space: nowrap; word-break: keep-all; word-wrap: none;}
table.cp-datatable-con > thead{ background-color: #13357B; color: #fff;}
table.cp-datatable-con > thead > tr > th { text-align: center;text-transform: capitalize; }
table.cp-datatable-table > thead { background-color: #13357B; color: #fff; }
table.cp-datatable-table.ltr { display: inline; font-size: 14px; font-family: 'Open Sans', Tahoma, Arial, helvetica, sans-serif; }
table.cp-datatable-table.rtl { font-size: 13px; font-family: 'Cairo', sans-serif; }

table.cp-datatable-table > thead > tr > th { padding: 0 0px; cursor: pointer; position: sticky; top: 0; z-index: 99; overflow: hidden;padding:5px 10px;}
table.cp-datatable-table > thead > tr > th:first-child{ padding-left: 16px; }
.cp-datatable-table-th { display: flex; flex: 1; flex-direction: row; padding:4px }
.cp-datatable-table-th > p { display: flex; flex: 1; text-align: center; margin: 0; width: auto; word-break: keep-all; margin: 0; text-transform: capitalize; overflow: hidden }
.cp-datatable-table-th > div { display: flex; justify-content: center; align-items: center; flex-direction: column; margin: 0 0 0 2px }
.cp-datatable-table-th > div > i { height: 2px; line-height: 5px; display: flex; justify-content: center; align-items: center; color: silver; opacity: 0.5 }
table.cp-datatable-table > tbody > tr { overflow-x: auto; width: auto; white-space: nowrap; word-break: keep-all; word-wrap: none; margin: 0 }
table.cp-datatable-table > tbody > tr.searchVisible { display: table-row; }
table.cp-datatable-table > tbody > tr.searchInvisible { display: none; }
table.cp-datatable-table > tbody > tr.rowVisible { display: table-row; }
table.cp-datatable-table > tbody > tr.rowInvisible { display: none; }
table.cp-datatable-table > tbody > tr > td {  padding: 6px 4px; position: relative; white-space:break-spaces }
table.cp-datatable-table > tbody > tr > td:first-child{ padding-left: 16px; padding-right: 16px; border-left: unset !important; border-left-width: 0 !important }
table.cp-datatable-table > tbody > tr > td:last-child{ padding-right: 24px; border-right: unset !important; border-right-width: 0 !important }
table.cp-datatable-table[name=''] > tbody > tr > td { white-space : unset !important; word-break: unset !important }
table.cp-datatable-table > tbody > tr:hover { background-color: skyblue !important }
table.cp-datatable-table > tbody > tr:nth-child(even) {background-color: #eaeaea}
/* CHECKBOX */
.cp-datatable-checkbox { display: none; margin: 0 10px; position: absolute; left: 0; transform: scale(1.4) }
.cp-datatable-checkbox:checked{ display: inline; margin: 0 10px }
table.cp-datatable-table > tbody > tr:hover .cp-datatable-checkbox{ display: inline; margin: 0 10px }
table.cp-datatable-table > tbody > tr > td > p {  margin: 0 }

/* FOOTER */
.cp-datatable-footer { display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 5px 10px 5px 10px; margin: 5px 0px 5px 0px; border-top:1px solid #eaeaea; height: 40px ;position:sticky;background:white;bottom:0px}
.cp-datatable-footer > :first-child { display: flex; flex-direction: row; align-items: center }
.cp-datatable-footer > div:first-child > p { margin: 0 }
.cp-datatable-footer :last-child { display: flex; flex-direction: row }
.cp-datatable-footer > div:last-child > input { width: 80px }
.cp-datatable-footer :last-child > p { display: flex; justify-content: center; align-items: center; margin: 0 10px; font-family: inherit; text-align: left; font-family: inherit }
.cp-datatable-pagebbutton { background-color: #13357B }
.cp-datatable-pagebbutton:active { background-color: #276091 }
.cp-datatable-pagebbutton:disabled { background-color: silver }
.cp-datatable-inlineselect-td { padding: 0 0 0 0 }
.cp-datatable-inlineselect-td :last-child { display: none; border: 0; outline: none; height: 23px; padding: 0; margin: 0; font-size: 13px }
.cp-datatable-inlineselect-td:hover :first-child { display: none }
.cp-datatable-inlineselect-td:hover :last-child { display: inline-block; width: calc(100% + 16px); transform: translateX(-8px) }
.cp-datatable-td { position: relative }
.cp-datatable-td > input{ position: absolute; transform: scale(1.2); right: 4px; cursor: pointer }
.cp-datatable-td > input:checked { color: #34a853; }
.cp-datatable-component-link { color: blue; text-decoration: underline; cursor: pointer; }
.cp-datatable-component-link-loader > img { width: 30px }
.cp-datatable-component-checkbox{ position: relative; display: flex; flex-direction: column; top:0; justify-content: center; align-items: center }
.cp-datatable-component-checkbox > img { width: 40px }
.cp-datatable-component-checkbox > p { padding: 0; margin: 0; word-break: break-all }
.cp-datatable-component-inlineselectlist { display: flex; justify-content: center; align-items: center; flex: 1 }
.cp-datatable-component-inlineselectlist >div { width: 100% }
.cp-datatable-component-inlineselectlist p { height: 22px; line-height: 18px; padding: 2px 8px; margin: 2px 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex: 1 }
.cp-datatable-component-inlineselectlist  select { justify-content: flex-start; align-items: center; height: 22px; margin: 2px 0; border: 1px solid silver; outline: none; width: calc(100%); flex: 1 }
.cp-datatable-component-inlineselectlist  select > option:disabled { background-color: #cacaca !important; color: #999999 !important }
.cp-datatable-component-inlineselectlist select:hover{ box-shadow: 0 0 4px rgba(0,0,0,0.1) }
.cp-datatable-component-inlineselectlist > img { width: 20px }
.cp-datatable-component-button { display: flex; flex-direction: row; justify-content: center; align-items: center; background-color: #efefef; padding: 2px 6px; cursor: pointer; margin: 2px 0; border:0; width: 100%; outline: none; border-radius: 4px }
.cp-datatable-component-button > img { width: 16px; margin: 1px 0 }
.cp-datatable-component-button > span { padding: 0 0 0 4px; font-size: 13px }
.cp-datatable-component-button:hover { opacity: 0.9 }
.cp-datatable-component-button:active { background-color: #838383; opacity: 0.5 }
.cp-datatable-component-emailscounter { display: flex; flex-direction: row; justify-content: center; align-items: center }
.cp-datatable-component-InlineTextInput { position: relative; overflow: hidden }
.cp-datatable-component-InlineTextInput > div { display: flex; margin: 0px 0; flex-direction: row; justify-items: center; align-items: center }
.cp-datatable-component-InlineTextInput > div > img { width: 26px; transform: scale(1.4) }
.cp-datatable-component-InlineTextInput > div > input { margin: 0 10px 0 0; border: 1px solid rgba(0,0,0,0.5); outline: none; padding: 3px }
.cp-datatable-component-InlineTextInput > div > input[type=number]{ width: 80px }
.cp-datatable-component-InlineTextInput > div > div { background-color: #13357B }
.cp-datatable-component-InlineTextInput > div > div:last-child { margin: 0 0px 0 10px; background-color: red }
/* Data-table search-input */
.data-table-search-input { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; margin: 0 10px 0 0 }
.data-table-search-input > .icon { padding: 4px 8px; color: #fff; height: 28px; width: 28px; overflow: hidden; border-radius: 40px; display: flex; flex-direction: row-reverse; transition: all ease-in-out 0.5s; cursor: pointer; border: 0.5px solid #d3d3d3 }
.data-table-search-input > .icon.focus { width: 240px }
.data-table-search-input.datatable-rows-number > .icon.focus { width: 140px }
.data-table-search-input > .icon > input { outline: none; border: unset; background-color: unset; color:black; padding: 0 10px 0 10px; width: 100px; flex: 1 }
.data-table-search-input.datatable-rows-number > .icon > input { padding: 0 10px 0 18px }
.data-table-search-input > .icon > div { width: 0px; padding: 0 5px 0 22px; border-left: 1px solid dimgrey; display: flex; justify-content: center; align-items: center }
.data-table-search-input > .icon > div > i { line-height: 0; color: var(--font-primary-color) }
.data-table-search-input > .icon:active > div > i { transform: scale(0.95); transform-origin: center center }
/* multi-select */
/* multi select tab */
.datatable-multi-select { position: relative; height: 22px; }
.datatable-multi-select > div[kind='list'] > div::-webkit-scrollbar { width: 10px; }
.datatable-multi-select > div[kind='list'] > div::-webkit-scrollbar-track { background: #fff; }
.datatable-multi-select > div[kind='list'] > div::-webkit-scrollbar-thumb { background: #888;border-radius: 5px; }
.datatable-multi-select > div[kind='list'] > div::-webkit-scrollbar-thumb:hover { background: #555; }
.datatable-multi-select > input { display: none; }
.datatable-multi-select > input:not(:checked) + div[kind='list'] { transform: scale(0); }
.datatable-multi-select > div > div[kind='button'] { display: flex; padding: 0 16px; justify-content: center; align-items: center; color: #fff; background-color: var(--panel-contrast-color); cursor: pointer; border-radius: 3px; transition: all ease-in-out 0.05s }
.datatable-multi-select > div > div[kind='button']:active { transform: scaleX(0.98) }
.datatable-multi-select > div > div[kind='button'] > p { padding: 3px 0; margin: 0; line-height: 16px; font-size: 14px; user-select: none; font-weight: 300 }
.datatable-multi-select > div[kind='list'] { position: absolute; transition: all ease-in-out 0.05s; transform-origin: top right; top: 0px; right: 0px; background-color: #fff; border-radius: 6px 0 6px 6px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); z-index: 10000 }
.datatable-multi-select > div[kind='list'] > div:first-child { display: flex; flex-direction: row; justify-content: center; align-items: center; box-shadow: 0 0px 40px rgba(0, 0, 0, 0.2) }
.datatable-multi-select > div[kind='list'] > div:first-child > div { display: flex; flex-direction: row; justify-content: center; align-items: center; background-color: var(--panel-contrast-color); width: calc(100% - 20px); margin: 10px 10px; padding: 4px 0; border-radius: 4px; transition: all ease-in-out 0.05s; cursor: pointer; height: 24px; overflow: hidden; user-select: none }
.datatable-multi-select > div[kind='list'] > div:first-child > div > span { color: #fff; line-height: 16px; font-size: 13px; user-select: none }
.datatable-multi-select > div[kind='list'] > div:first-child > div > img { width: 16px }
.datatable-multi-select > div[kind='list'] > div:first-child > div:not([status='loading']):active { transform: scale(0.95) }
.datatable-multi-select > div[kind='list'] > div:first-child > div[status='loading'] { transform: scale(1); background-color: silver }
.datatable-multi-select > div[kind='list'] > div:last-child { max-height: 400px; overflow: auto; min-width: 200px; padding: 10px 0 }
.datatable-multi-select > div[kind='list'] > div:last-child > div { display: flex; flex-direction: row; justify-content: flex-start; align-items: center; width: 100%; cursor: pointer; padding: 4px 10px; transition: all ease-in-out 0.05s }
.datatable-multi-select > div[kind='list'] > div:last-child > div:hover { background-color: #efefef }
.datatable-multi-select > div[kind='list'] > div:last-child > div > div { background-color: #fff; border: 1px solid silver; width: 16px; height: 16px; display: flex; justify-content: center; align-items: center; margin: 0 10px 0 0 }
.datatable-multi-select > div[kind='list'] > div:last-child > div > div > span { background-color: var(--panel-contrast-color); width: 12px; height: 12px; transition: all ease-in-out 0.05s }
.datatable-multi-select > div[kind='list'] > div:last-child > div > div > span[kind='unselected'] { transform: scale(0) }
.datatable-multi-select > div[kind='list'] > div:last-child > div > p { padding: 0; margin: 0; flex: 1; white-space: nowrap; user-select: none }

/* TextHover */
.data-table-texthover { position: relative; }
.data-table-texthover:hover > div { display: flex }
.data-table-texthover > div { position: absolute; background-color: black; color: #fff; padding: 10px 16px; display: none; z-index: 10; left: -16px; top: 22px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5) }
.data-table-texthover > div > pre { background-color: black; color: #fff; z-index: 10; margin: 0; padding: 0; border: 0 }
.data-table-texthover > div > div { background-color: black; width: 16px; height: 16px; position: absolute; top: -6px; left: 20px; transform: rotateZ(45deg) }
.data-table-driver-details-component { display: flex; flex-direction: row; justify-content: space-between }
.data-table-driver-details-component > p { margin: 0 10px 0 0; white-space: nowrap }
.data-table-driver-details-component-content { padding: 16px 10px; width: 400px }
.data-table-driver-details-component-content > div:last-child { display: flex; flex-direction: row }
.data-table-driver-details-component-content > div:last-child > input { display: flex; flex-direction: row; flex: 1; margin: 0 10px 0 0; padding: 0 10px; outline: unset; font-size: 16px; font-weight: 600; border: 1px solid silver }

.data-table-columns-ptimizer-button { padding: 4px 8px; margin: 0 10px 0 0; height: 28px; width: 28px; overflow: hidden; border-radius: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; border: 0.5px solid #d3d3d3; }
.data-table-columns-ptimizer-button:hover { background-color: silver; }
.data-table-columns-ptimizer-button:active { background-color: rgb(131, 131, 131); }

.data-table-columns-ptimizer-list { background-color: var(--body-bg-color);padding: 10px 0;display: flex;flex-direction: column !important;max-height: 600px;overflow: auto}
.data-table-columns-ptimizer-list::-webkit-scrollbar { width: 8px;}
.data-table-columns-ptimizer-list::-webkit-scrollbar-track { background: rgba(0,0,0,0); }
.data-table-columns-ptimizer-list::-webkit-scrollbar-thumb { background: #888;border-radius: 4px; }
.data-table-columns-ptimizer-list::-webkit-scrollbar-thumb:hover { background: #555; }
.data-table-columns-ptimizer-list-item {display: flex;flex-direction: row;justify-content: flex-start;align-items: center;width: 100%;padding: 3px 20px; }
.data-table-columns-ptimizer-list-item:hover {background-color: rgb(131, 131, 131)}
.data-table-columns-ptimizer-list-item > input[type='checkbox'] {cursor: pointer;transform-origin: center center;transform: scale(1.2)}
.data-table-columns-ptimizer-list-item > input[type='text'] {border: unset;flex: 1;margin: 0 10px;font-size: 14px;text-align: left !important;outline: none;background-color: var(--container-bg-color)}

.data-table-columns-ptimizer-list-item > label > p {white-space: nowrap;flex: 1;margin: 0 10px;font-size: 16px;text-align: left !important}
.data-table-columns-ptimizer-list-item > div {display: flex;flex-direction: row;justify-content: center;align-items: center}
.data-table-columns-ptimizer-list-item > div > p {margin: 0;min-width: 40px;font-size: 14px;font-weight: 900;user-select: none; }
.data-table-columns-ptimizer-list-item > div > i { border-radius: 50%;width: 20px;height: 20px;display: flex;justify-content: center;align-items: center;border: 1px solid silver;background-color: var(--container-bg-color);cursor: pointer; }
.data-table-columns-ptimizer-list-item > div > i:hover { background-color: #0366d6;color: #fff; }
.data-table-columns-ptimizer-list-item > div > i:active { background-color: silver;color: #000; }

.cp-table-footer-button { width: 26px;height: 26px;display: flex;justify-content: center;align-items: center;border: 1px solid #d3d3d3;border-radius: 50%;color: #555;cursor: pointer;margin-right: 10px; }
.cp-table-footer-button:hover { background-color: #838383;color:white; }
.cp-table-footer-button:active { background-color: #555;color:white; }
.cp-table-footer-button > i { font-size: 14px;line-height: 10px; }


/* PopoverLabel */
.cp-popover-label { position: relative; }
.cp-popover-label:hover > .cp-popover-label-div { display: flex; }
.cp-popover-label-div { position: absolute;margin-top: 10px;display: none; }
.cp-popover-label-div > p { background-color: black;color: white;border-radius: 4px;font-size: 16px;margin: 0;padding: 3px 8px;z-index: 1000;position: relative;width: 900; }
.cp-popover-label-div > div { background-color: black;width: 14px;height: 14px;position: absolute;top: 0;transform: rotate(45deg);top: -5px;border-radius: 4px;z-index: 999; }
/* top-start */
.cp-popover-label-top-start > div { right: unset;left: 10px; }
.cp-popover-label-top-end > div { right: 10px;left: unset; }

/* Button */
.customButton { background-color: #3554D1; color: #fff; font-family:'Open Sans', Tahoma, Arial, helvetica, sans-serif; transition: border-radius 0.5s ease-in; user-select: none; outline: none; border: 0; border-radius: 2px; display:flex; width: 100%; /* flex:1; */ justify-content: center; align-items: center; text-transform: capitalize }
.customButton.ltr { font-family:'Open Sans', Tahoma, Arial, helvetica, sans-serif; }
.customButton.rtl { font-family: 'Cairo', sans-serif; }
.customButton:disabled { background-color: silver; opacity: 0.8 }
.customButton > img { width: 25px }
.button-s { font-size: 12px; padding: 1px 5px }
.button-m { height: 26px; font-size: 12px; line-height: 16px; padding: 5px 10px }
.customButton.button-m > img { width: 16px }
.button-l { font-size: 14px; padding: 6px 12px }
.button-xl { font-size: 18px; padding: 10px 16px }
.customButton:hover { border-radius: 8px }
.customButton:active { background-color: #3554D1; }
.customButton:disabled { background-color: rgb(169, 169, 169); }
    `}</style>
  )
}

const PopoverLabel = (props) => {
  let { label, children, placement = 'top-start' } = props;
  //
  if (typeof label === 'string' && label.length > 0) {
    return (
      <div className='cp-popover-label'>
        {children || <React.Fragment></React.Fragment>}
        <div className={`cp-popover-label-div cp-popover-label-${placement}`}>
          <div></div>
          <p>{label}</p>
        </div>
      </div>
    )
  } else {
    return children || <React.Fragment></React.Fragment>
  }
}

export function ParagraphReactComponent(params = { 'text': String(), value: String(), title: String(), style: Map(), className: String(), onClick: Function(), 'label': String(), placement: String() }) {
  let { text, value, title, style = {}, className = '', onClick = () => { }, label, placement } = params;
  let isEmpty = value === 'NULL' || value === '' || value === null ? { color: 'silver' } : {};
  if (Array.isArray(text)) {
    text = text.map((t, i) => <React.Fragment key={i}><span>{t}</span><br /></React.Fragment>)
  }

  let _value = Array.isArray(text) ? text.join(' \n') : String(value || text || '');
  let element = <p onClick={onClick} title={label ? '' : (title || text || '')} className={className} style={{ ...style, ...isEmpty }}>{text || value || ''}</p>;
  return {
    component: 'ReactComponent',
    'element': params.label ? <PopoverLabel label={label} placement={placement}>{element}</PopoverLabel> : element,
    'value': _value,
    'title': title || text || undefined,
  }
}

function isObject(object) {
  if (typeof object === 'object' && object !== null && !Array.isArray(object)) { return true; } else { return false }
}
function isString(string, maxmin) {
  if (typeof string === 'string') {
    if (Array.isArray(maxmin) && maxmin.length === 2 && Number.isInteger(maxmin[0]) && Number.isInteger(maxmin[1])) {
      if (string.length >= maxmin[0] && string.length <= maxmin[1]) {
        return true;
      } else { return false; }
    } else { return true; }
  } else { return false; }
}

const FotterButton = (props) => {
  let { icon = 'fas fa-times', onClick = () => { }, title } = props;
  return (
    <div className='cp-table-footer-button' title={title} onClick={onClick}>
      <i className={icon}></i>
    </div>
  )
}

function SearchInput(props) {
  const [visible, setvisible] = React.useState(true);
  const [value, setvalue] = React.useState(props.value);
  let { onChange, type, icon, className, onKeyDown = () => { } } = props;
  React.useEffect(() => {

  }, [props])
  function onChangeFun(e) {
    onChange(e);
    setvalue(e.target.value);
  }
  return (
    <div className={`data-table-search-input ${className || ''}`}>
      <div className={`icon focus`}>
        <div>
          <i className={icon} aria-hidden></i>
        </div>
        <input type={type || 'text'} placeholder={props.placeholder} value={String(value)} onChange={onChangeFun} onKeyDown={onKeyDown} />
      </div>
    </div>
  )
}
const InlineHTML = (props) => {
  let __html = props.html;
  return (
    <div style={__html === 'NULL' ? { color: 'silver' } : {}} {...{ ...props, html: undefined }} dangerouslySetInnerHTML={{ __html }}></div>
  )
}
//
const TableHead = (props) => {
  let { sortDirection, sortForColumn, sort = true, sorting = () => { }, thead = [] } = props;
  //
  function __sorting({ e, elName, i, th }) {
    if (elName === 'th') {
      if (!th.element && sort === true) {
        sorting(i)
      }
    } else {
      if (th.element && sort === true) {
        sorting(i)
      }
    }
  }
  //
  return (
    <thead id='datatableComponentHead'>
      <tr>
        {thead.map((_th, i) => {
          // set th object
          let th = {};
          if (typeof _th === 'object') {
            th = _th;
          } else if (typeof _th === 'string') {
            th = { 'innerText': _th }
          }
          //
          let sortUp = sortDirection === 2 && sortForColumn === i ? { color: 'white', opacity: 1 } : {}
          let sortDown = sortDirection === 1 && sortForColumn === i ? { color: 'white', opacity: 1 } : {}
          let component = <></>;
          //
          if (typeof th.element === 'object') {
            component = th.element
          } else if (typeof th.innerText === 'string') {
            component = <p>{th.innerText}</p>
          } else if (th.value) {
            component = <p>{th.value}</p>
          }
          //
          return (
            <th key={i} className={th.className || ''} style={{ backgroundColor: '#13357B', ...(th.style || {}) }} onClick={() => __sorting({ i, th, elName: 'th' })}>
              <div className={`cp-datatable-table-th`} >
                {component}
                {sort === false
                  ? <React.Fragment></React.Fragment>
                  : <div onClick={() => __sorting({ i, th, elName: 'div' })}>
                    <i className='fas fa-sort-up' style={sortUp}></i>
                    <i className='fas fa-sort-down' style={sortDown}></i>
                  </div>
                }
              </div>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

function sortingRows(params = {}) {
  let { sortDirection, data, sortForColumn } = params;
  // collect keys
  let keys = [];
  //
  if (typeof data[0] === 'object') {
    let { tr, td, ...row } = data[0];
    if (typeof td === 'object') {
      keys = Object.keys(td)
    } else {
      keys = Object.keys(row)
    }
  }
  //
  //
  if (keys.length > 0 && Number.isInteger(sortForColumn) && sortForColumn >= 0 && sortForColumn < keys.length) {
    let key = keys[sortForColumn];
    data = data.sort((a, b) => {
      if (isObject(a)) {
        if (!Number.isNaN(parseFloat((a.td || a)?.[key]?.value))) {
          if (parseFloat((a.td || a)?.[key]?.value) < parseFloat((b.td || b)?.[key]?.value)) { return sortDirection === 2 ? 1 : -1; }
          if (parseFloat((a.td || a)?.[key]?.value) > parseFloat((b.td || b)?.[key]?.value)) { return sortDirection === 2 ? -1 : 1; }
        } else {
          if ((a.td || a)?.[key]?.value < (b.td || b)?.[key]?.value) { return sortDirection === 2 ? 1 : -1; }
          if ((a.td || a)?.[key]?.value > (b.td || b)?.[key]?.value) { return sortDirection === 2 ? -1 : 1; }
        }

      }
      return 0;
    })
  }
  return data;
}
//
function getTableConfigration(params = {}) {
  let { ref, rows, } = params;
  if (ref.current) {
    let container = ref.current;
    let tableHeight = container.children[0].offsetHeight
    let tableHeadHeight = container.querySelector('table>thead').offsetHeight
    let footerHeight = container.children[1].offsetHeight;
    let trs = container.querySelectorAll('tbody > tr');
    //
    if (!Number.isInteger(rows)) {
      let heightCounter = 0;
      let rowsCounter = 0;
      for (let tr of Array.from(trs || [])) {
        heightCounter = heightCounter + tr.offsetHeight;
        rowsCounter++;
        if (heightCounter > (tableHeight - tableHeadHeight)) {
          heightCounter = heightCounter - tr.offsetHeight;
          rows = rowsCounter - 1;
          break;
        }
      }
    }
  }
  //
  return { rows }
}

function getTableTextContent(params = { 'extraExportContent': [] }, options = {}) {
  let { extraExportContent, data, thead } = params;
  extraExportContent = Array.isArray(extraExportContent) ? extraExportContent : [];
  //
  let tbody = [];
  if (Array.isArray(data)) {
    tbody = data.map(({ td }) => Object.values(td).map((obj, i) => {
      let dataType = undefined;
      let __string__ = obj.title || obj.value;
      //
      if (Array.isArray(thead)) {
        dataType = (typeof thead[i] === 'object' ? thead[i] : {})['data-type'] || undefined;
        if (dataType === 'number') {
          if (!Number.isNaN(parseFloat(__string__))) {
            __string__ = parseFloat(__string__);
          }
        }
      }
      //
      return __string__;
    }));
  } else {
    tbody = Array.from(tableRef.current.querySelectorAll('tbody > tr')).map(tr => {
      let td = Array.from(tr.querySelectorAll('td')).map(td => td.innerText);
      return td;
    });
  }
  //
  thead = Array.isArray(thead)
    ? thead.map(th => typeof th === 'string' ? th : th.innerText)
    : Array.from(tableRef.current.querySelectorAll('thead > tr > th')).map(th => th.innerText)
  //
  let table = [thead, ...tbody];
  if (extraExportContent.length > 0) {
    for (let index in extraExportContent) {
      let { type, data } = extraExportContent[index];
      table = [...data, ...table]
    }
  }
  //
  return {
    thead,
    tbody,
    'table': table,
    'text': table.map(row => row.join('\t')).join('\r\n') //thead.join('\t') + '\r\n' + tbody.map(tr=>tr.join('\t')).join('\r\n')
  }
}

/**
 * props : { rows , defaultRows , total , currentPage , numberOfPages , onRowsNumberChange , onSearch , onNavigation  }
*/
class TableFooter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }
  }
  handleKeyPress(e) {
    // if (e.key === 'Enter') {
    //   this.props.onSearch(this.state.searchValue)
    // }

    this.props.onSearch(this.state.searchValue)
  }
  onRowsNumberChange(e) {
    let rows = parseInt(e.target.value)
    if (Number.isInteger(rows)) {
      if (rows < 1) { rows = 1 };
      // this.setState({ rows },()=>{
      this.props.onRowsNumberChange(rows);
      // })
    }

  }
  navigating(type) {
    let { currentPage, numberOfPages } = this.props;
    let obj = {};
    if (type === 'next') { obj = { currentPage: (currentPage + 1) <= numberOfPages ? (currentPage + 1) : numberOfPages } }
    if (type === 'back') { obj = { currentPage: (currentPage - 1) < 1 ? 1 : (currentPage - 1) } }
    this.props.onNavigation(obj)
  }
  getCopy() {
    let data = getTableTextContent({ 'extraExportContent': this.props.extraExportContent, 'data': this.props.data, 'thead': this.props.thead });
    let { text } = data
    navigator.clipboard.writeText(text);
  }
  getCsvFile() {
    let data = getTableTextContent({ 'extraExportContent': this.props.extraExportContent, 'data': this.props.data, 'thead': this.props.thead });
    let { thead, tbody } = data
    let csv = [
      thead.map(th => `"${th}"`).join(','),
      ...tbody.map(tr => tr.map(td => `"${typeof td === 'string' ? td.replaceAll('\r\n', ' - ').replaceAll('\n', ' - ') : td}"`).join(','))
    ].join('\n')
    let _URL = window.URL || window.webkitURL;
    let blob = new Blob([csv]);
    let aTag = document.createElement('a');
    aTag.href = _URL.createObjectURL(blob)
    aTag.download = `file_${Date.now()}.csv`
    aTag.click()
  }
  getExcelFile() {
    let data = getTableTextContent({ 'extraExportContent': this.props.extraExportContent, 'data': this.props.data, 'thead': this.props.thead });
    let { table } = data
    //
    try {
      // if (typeof window.XLSX === 'object' || XLSX) {
      let wb = XLSX.utils.book_new();
      wb.SheetNames.push("demo");
      wb.Sheets["demo"] = XLSX.utils.aoa_to_sheet(table);
      XLSX.writeFile(wb, `file_${Date.now()}.xlsx`);
      // } else {
      //   alert('XLSX module is not exist')
      // }
    } catch (error) {
      console.log(error)
    }

  }
  getPdfFile() {
    window.print()
  }
  render() {
    let { searchValue } = this.state;
    let { rows, total, currentPage, numberOfPages, start, end } = this.props;
    return (
      <div className='cp-datatable-footer'>
        <div>
          {this.props.export ? <FotterButton icon='fas fa-copy' title='Copy' onClick={e => this.getCopy()} /> : <React.Fragment></React.Fragment>}
          {this.props.export ? <FotterButton icon='fas fa-file-pdf' title='PDF File' onClick={e => this.getPdfFile()} /> : <React.Fragment></React.Fragment>}
          {this.props.export ? <FotterButton icon='fas fa-file-csv' title='CSV File' onClick={e => this.getCsvFile()} /> : <React.Fragment></React.Fragment>}
          {this.props.export ? <FotterButton icon='fas fa-file-excel' title='Excel File' onClick={e => this.getExcelFile()} /> : <React.Fragment></React.Fragment>}
          <SearchInput value={searchValue} placeholder='Inline Search ...' onChange={e => this.setState({ 'searchValue': e.target.value })} onKeyDown={e => this.handleKeyPress(e)} icon='fas fa-search' type='text' />
          <SearchInput value={String(rows)} onChange={e => this.onRowsNumberChange(e)} icon='fas fa-bars' type='number' className='datatable-rows-number' />
          <p>• apparent : {'('}{start + 1} to {end >= total ? total : end}{')'} of {total}</p>
        </div>
        <div>
          <Button size={'l'} title={'Prev'} className='cp-datatable-pagebbutton' disabled={currentPage === 1 ? true : false} onClick={e => this.navigating('back')} />
          <p style={{ padding: '0 12px' }}>{`page ${currentPage} of ${currentPage >= numberOfPages ? currentPage : numberOfPages}`}</p>
          <Button size={'l'} title={'Next'} className='cp-datatable-pagebbutton' disabled={currentPage >= numberOfPages ? true : false} onClick={e => this.navigating('next')} />
        </div>
      </div>
    )
  }
}

const Td = (props) => {
  let { name, td } = props;

  //
  if (typeof td[name] === 'string') { td = { 'innerText': td[name], 'value': td[name] } }
  //
  let { className, value, innerText, colSpan, component, ...attr } = td;
  // td props
  let tdProps = {};
  if (Number.isInteger(colSpan)) { tdProps.colSpan = colSpan }
  if (isObject(td.tdProps)) {
    tdProps = { ...tdProps, ...td.tdProps }
  }
  // td style
  let tdStyle = {};
  if (innerText === 'NULL') { tdStyle.color = 'silver' }


  //
  let reactComponent = <></>;
  switch (component) {
    case 'InlineHTML': reactComponent = <InlineHTML {...attr} />; break;
    case 'ReactComponent': reactComponent = td.element; break;
    default:
      if (innerText || value) { reactComponent = <p>{innerText || value}</p> }
      break;
  }

  return (
    <td
      {...tdProps}
      className={[
        className,
        'cp-datatable-td',
        String(value || '').toLowerCase() === 'cancelled' ? 'redColor' : '',
        (String(value || '').toLowerCase() === 'new') || (String(value || '').toLowerCase() === 'updated') ? 'capitalize' : '',
      ].filter(s => s).join(' ')
      }
      style={tdStyle} >
      {reactComponent}</td>
  )
}

const Tr = (props) => {
  let { index, row, tableClassic, ...attr } = props;

  //
  return (
    <tr id={index === 0 ? 'datetableComponentfirstRow' : undefined} style={isString(tableClassic) && index % 2 == 0 ? { 'backgroundColor': tableClassic } : {}} {...(row.tr || {})}>
      {Object.keys(row.td).map((key, x) => {
        let td = row.td[key];
        return <Td key={x} td={td} name={key} />
      })}
    </tr>
  )
}

const tableRef = React.createRef();
export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      sortDirection: 0,
      sortForColumn: '',
    }
  }
  componentDidUpdate() {
    let config = {}
    let { rows } = this.props;
    //
    if (rows === undefined) {
      let log = getTableConfigration({ 'rows': this.props.rows, 'ref': tableRef });
      if (Number.isInteger(log.rows)) {
        this.setRowsNumbr({ 'rows': log.rows })
      }
    }
  }
  sorting(sortForColumn) {
    let { sortDirection } = this.state;
    switch (sortDirection) {
      case 0: sortDirection = 1; break;     // DESC
      case 1: sortDirection = 2; break;     // ASC
      case 2: sortDirection = 0; sortForColumn = this.props.sortForColumnIndex || 0; break;
      default: break;
    }
    this.setState({ sortForColumn, sortDirection })
  }
  setRowsNumbr(params) {
    let config = {}
    config.rows = params.rows;
    if (config.rows > this.props.data.length) {
      config.numberOfPages = 1
    } else {
      config.numberOfPages = this.props.data.length / config.rows;
      config.numberOfPages = Math.floor(config.numberOfPages) + (String(config.numberOfPages).includes('.') ? 1 : 0)
    }
    //
    if (Object.keys(config).length > 0) {
      this.props.setTableConfig(config)
    }
  }
  render() {
    let { sortDirection, sortForColumn, searchValue } = this.state;
    let { thead, tableClassic, data, currentPage, rows, numberOfPages, extraExportContent, className } = this.props;
    // targetData      = (Array.isArray(targetData)?targetData:[]).slice(start,end);
    //
    if (searchValue.length > 1) {
      data = data.filter(row => {
        let { tr, td } = row;
        let textContent = [].concat(...Object.values(td).map(({ value, innerText }) => [String(value), innerText])).join('').toLowerCase()
        if (textContent.includes(searchValue.toLowerCase())) {
          return true;
        } else { return false }
      })
    }
    //
    data = sortingRows({ data, sortDirection, sortForColumn })
    let start = 0;
    let end = data.length
    if (Number.isInteger(rows) && data.length > rows) {
      start = Math.floor((currentPage - 1) * rows);
      end = Math.floor(currentPage * rows);
      data = data.slice(start, end)
    }
    //
    return (
      <React.Fragment>
        <Style />
        <div className={`cp-datatable-con ${className || ''}`} ref={tableRef}>
          {/* //style={{ overflow: 'auto', transition: 'all ease-in-out 0.0s' }}  */}
          <div >
            <table className={`cp-datatable-table cp-datatable-con`} >
              <TableHead thead={thead} sort={this.props.sort} sorting={i => this.sorting(i)} sortDirection={sortDirection} sortForColumn={sortForColumn} />
              <tbody>{data.map((obj, i) => {
                return <Tr key={i} index={i} row={obj} tableClassic={tableClassic} />
              })}</tbody>
            </table>
          </div>
          <TableFooter data={this.props.data} thead={thead} {...{ rows, start, end, 'total': this.props.data.length, currentPage, numberOfPages, 'export': this.props.export, extraExportContent }} onRowsNumberChange={rows => this.setRowsNumbr({ rows })} onSearch={searchValue => this.setState({ searchValue })} onNavigation={this.props.setTableConfig} />
        </div>
      </React.Fragment>
    )
  }
}
