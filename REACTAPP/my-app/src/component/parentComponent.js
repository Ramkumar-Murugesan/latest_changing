import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import Chance from 'chance';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import testData from './testData';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




const CheckboxTable = checkboxHOC(ReactTable);

const chance = new Chance();

function getData()
{
  const data = testData.map((item)=>{
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    const _id = chance.guid();
    return {
      _id,
      ...item,
    }
  })
  return data;
}

function getColumns(data)
{
  const columns = [];
  const sample = data[0];
  Object.keys(sample).forEach((key)=>{
    if(key!=='_id') 
    {
      columns.push({
        accessor: key,
        Header: key,
      })
    }
  })
  return columns;
}

class parent extends React.Component {
  constructor() {
    super();
    const data = getData();
    const columns = getColumns(data);
    this.state = {
      data,
      columns,
      selection: [],
      selectedRow : [],
      selectAll: false, 
    };
  }
  selected = (key,shift,row) => {
   console.log("entering into selected key values--------",key)
   console.log("entering into selected shift values--------",shift)
   console.log("entering into selected row values--------",row)
} 

  toggleSelection = (key, shift, row) => {
      var selectedRow = [];
    console.log("toggleselection key------",key);
    console.log("toggleselection shift----------",shift);
    console.log("toggleselection row--------",row)
    if(row != undefined){
        this.state.selectedRow.push(row);
        this.setState(this.state)
    //    this.setState({selectedRow : row});
    // this.selectedRow.setState(row); 
    }
    console.log("toggleselection row selected------",this.state.selectedRow)
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [
      ...this.state.selection
    ];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ]
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  }

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach((item) => {
        selection.push(item._original._id);
      })
    }
    this.setState({ selectAll, selection })
  }

  isSelected = (key) => {
    //   console.log("isselected key values-----",key)
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  }

  logSelection = () => {
    console.log('selection:', this.state.selection);
  }

  reRouting() {
      
  }
  
  render() {
    const { toggleSelection, toggleAll,selected, isSelected, logSelection } = this;
    const { data, columns, selectAll, } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      selected,
      toggleAll,
      selectType: 'checkbox',
    };

    return (
      <div>
        <button onClick={logSelection}>Log Selection</button>
        <CheckboxTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"

          {...checkboxProps}
        />
        <button onClick={reRouting}></button>
      </div>
    );
  }
}

export default parent;























// import React from "react";
// import { render } from "react-dom";
// import { makeData } from "./childComponent";

// // Import React Table
// import ReactTable from "react-table";
// import "react-table/react-table.css";

// class parent extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       data: makeData()
//     };
//   }
//   render() {
//     const { data } = this.state;
//     return (
//       <div>
//         <ReactTable
//           data={data}
//           columns={[
//             {
//               Header: "INFO",
//               columns: [
//                 {
//                   Header: "First Name",
//                   accessor: "firstName"
//                 },
//                 {
//                   Header: "Last Name",
//                   id: "lastName",
//                   accessor: d => d.lastName
//                 }
//               ]
//             },
//             {
//               Header: "ADDRESS",
//               columns: [
//                 {
//                   Header: "Age",
//                   accessor: "age"
//                 }]
//             },
            
//           ]}
//           defaultPageSize={10}
//           className="-striped -highlight"
//         />
//         <br />
//       </div>
//     );
//   }
// }

// export default parent;