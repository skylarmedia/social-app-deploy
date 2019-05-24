// import React, { Component } from 'react';
// import { SketchPicker } from 'react-color';


// class ShowCategory extends Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             colors: [],
//             pushColor: '',
//             pushColorText: '',
//             emptyObj: {},
//             combineObj: function(color){
//                 console.log(color)
//                 this.setState({
//                     test:'TESTINGG123'
//                 })
//             },
//             test:''            
//         }

//         // this.combineColors = this.combineColors.bind(this);

//         this.handleColorText = this.handleColorText.bind(this);
//     }

//     // createForm() {
//     //     return this.state.colors.map((el, i) =>
//     //         <div key={i}>
//     //             <SketchPicker onChangeComplete={ this.handleChangeComplete.bind(this) }/>
//     //             <input type="text" value={el || ''} onChange={this.handleChangeText.bind(this, i)} />
//     //         </div>
//     //     )
//     // }



//     // handleChangeComplete = (i, color) => {

        
//     //     this.setState({
//     //         colorPalette: i.hex
//     //     });
//     //     console.log(this.state, 'color palette')
//     // }

//     // handleChangeText(i, event) {
//     //     let colors = [...this.state.colors];
//     //     colors[i] = event.target.value;
//     //     this.setState({ colors });
//     //     console.log(this.state, 'state change text');
//     // }



//     // addNewCategory() {
//     //     this.setState(prevState => ({ colors: [...prevState.colors, ''] }))
//     // }

//     handleColorText = e => {
//         this.setState({
//             pushColorText: e.target.value
//         })
//     }

//     render(){
//         console.log(this.state, 'the state is this');
//         return(
//             <div>
//                 <form>
//                     {/* {this.createForm()} */}
//                     <input type="text" value={this.state.pushColorText} onChange={this.handleColorText} />
//                     <input type='button' value='Add Category' onClick={this.addNewCategory.bind(this)} />
//                 </form>
//             </div>
//         )
//     }
// }

// export default ShowCategory;