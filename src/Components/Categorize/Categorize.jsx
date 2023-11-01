import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useState, useRef } from 'react'


const Categorize = ({question,setQuestions,questions,idx,AddNewQuestion,RemoveQuestion,AddPoints}) => {

    const [newCatt, setNewCatt] = useState('')
    const [newOptt, setNewOptt] = useState('')
    const [desc, setDesc] = useState('')
  
  
    const [catOfVal, setcatOfVal] = useState('')
    const newCat = useRef(null)
    let from = null
    let to = null
    let itemstart = null
    let itemend = null

    function setCatName(e,index,idx)
    {
      if(e.key==="Enter")
      {
        let newArr=[...questions]
        let ques=newArr[idx]
  
        ques.categories[index]=e.target.value
        ques.catNoptions[index].name=e.target.value
  
        newArr.splice(idx,1,ques)
        setQuestions(newArr)
        
      }
    }
  
    function setItemName(e,index,idx)
    {
      if(e.key==="Enter")
      {
        let newArr=[...questions]
        let ques=newArr[idx]
        ques.options[index].option=e.target.value
        newArr.splice(idx,1,ques)
        setQuestions(newArr)
  
        console.log("idx",questions)
        
      }
    }

    function ShiftHandler(idx) {
        ///drag and drop logic here
    
        let obj = questions[idx]
    
        let newArr = obj.categories //category array
    
        let fromEle = newArr[from]
        newArr.splice(from, 1)
    
        newArr.splice(to, 0, fromEle)
    
        let DescArr=obj.catNoptions
    
        let fromEle2=DescArr[from]
        DescArr.splice(from,1)
    
        DescArr.splice(to,0,fromEle2)
    
        obj.categories = newArr
        obj.catNoptions=DescArr
    
        let MainArr = [...questions]
    
        MainArr.splice(idx, 1)
        MainArr.splice(idx, 0, obj)
    
        setQuestions(MainArr)
    
    
        console.log("idx",questions)
      }
    
      function AddNewCat(e, idx) {
        
        if (e.key === 'Enter' && newCatt?.length > 0) {
          let obj = questions[idx]
    
          let newArr = obj.categories
    
          newArr.push(newCatt)
    
          obj.categories = newArr
          obj.catNoptions.push({name:newCatt,responses:[]})
    
          let MainArr = [...questions]
    
          MainArr.splice(idx, 1)
          MainArr.splice(idx, 0, obj)
    
          setQuestions(MainArr)
    
          setNewCatt('')
    
          console.log("idx",questions)
    
          
        }
      }
    
      function RemoveCat(index, idx) {
        let obj = questions[idx]
    
        let newArr = obj.categories //category array
    
        newArr.splice(index, 1)
        
        let DescArr=obj.catNoptions
    
        DescArr.splice(index, 1)
    
        obj.categories = newArr
        obj.catNoptions=DescArr
    
        let MainArr = [...questions]
    
        MainArr.splice(idx, 1)
        MainArr.splice(idx, 0, obj)
    
        setQuestions(MainArr)
    
    
        console.log("idx",questions)
    
    
       
      }
    
      const handleChange = (e, index, idx) => {
        // setAge(e.target.value);
    
        let obj = questions[idx]
    
        let newArr = obj.options
    
        let objX = newArr[index]
    
        objX.catOf = e.target.value
    
        newArr.splice(index, 1, objX)
    
        obj.options = newArr
    
        let MainArr = [...questions]
    
        MainArr.splice(idx, 1)
        MainArr.splice(idx, 0, obj)
    
        setQuestions(MainArr)
      }
    
      function AddNewItem(e, idx) {
        if (e.key === 'Enter' && newOptt?.length > 0) {
          let obj = questions[idx]
    
          let newArr = obj.options
    
          let newOne = {
            option: newOptt,
            catOf: null,
            settled:false
          }
    
          newArr.push(newOne)
    
          obj.options = newArr
    
          let MainArr = [...questions]
    
          MainArr.splice(idx, 1)
          MainArr.splice(idx, 0, obj)
    
          setQuestions(MainArr)
    
          setNewOptt('')
        }
      }
    
      function ShiftItems(e, idx) {
        console.log('idx', itemstart, itemend)
    
        let obj = questions[idx]
    
        let newArr = obj.options //options array
    
        let fromEle = newArr[itemstart]
    
        newArr.splice(itemstart, 1)
    
        newArr.splice(itemend, 0, fromEle)
    
        obj.options = newArr
    
        let MainArr = [...questions]
    
        MainArr.splice(idx, 1)
        MainArr.splice(idx, 0, obj)
    
        setQuestions(MainArr)
    
      }
      
    
      function RemoveItem(index, idx) {
        let obj = questions[idx]
    
        let newArr = obj.options //options array
    
        newArr.splice(index, 1)
    
        obj.options = newArr
    
        let MainArr = [...questions]
    
        MainArr.splice(idx, 1)
        MainArr.splice(idx, 0, obj)
    
        setQuestions(MainArr)
    
        // let newArr=[...options]
        // newArr.splice(index,1)
        // setOptions(newArr)
      }
    
      function handleChangeAddNew(e) {
        setcatOfVal(e.target.value)
      }
    
      function SetDescription(e, idx) {
        if (e.key === 'Enter' && desc?.length > 0) {
          console.log('idx', desc)
          let obj = questions[idx]
    
          obj.description = desc
    
          let MainArr = [...questions]
    
          MainArr.splice(idx, 1)
          MainArr.splice(idx, 0, obj)
    
          setQuestions(MainArr)
    
          setDesc('')
        }
      }

      function submitPoints(e)
      {
        if(e.key==='Enter'&&e.target.value)
        {
          AddPoints(e.target.value,idx)
          
        }
          
      }


  return (
    <div className="FormBody">
                <div className="col-lg-12 border p20" key={idx}>
                  <div style={{ textAlign: 'end' }}>
                    {' '}
                    ( {question?.questionType} )
                  </div>
                  <div className='d-flex justify-content-between'>
                  <h2>Question {idx + 1} : </h2>

                  <div>
       
                  <input type='text' style={{width:"100px"}} className='m-3 me-5' placeholder='Points'
                    onKeyDown={submitPoints}/>

                  </div>

                  </div>

                  <div className='m-3 mb-4'>
                  <input
                    type="text"
                    placeholder="Description(Optional)"
                    className='col-lg-9'
                    onChange={(e) => {
                      setDesc(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      SetDescription(e, idx)
                    }}
                  />

                  </div>


                  <div
                   
                    className='d-flex justify-content-start'
                  >
                    <div className="categoryMain">
                      <h4 className='mb-3'>Categories</h4>
                      {question?.categories.map((category, index) => {
                        return (
                          <div
                            draggable
                            key={index}
                            onDragStart={(e) => {
                              from = index
                            }}
                            onDragEnter={(e) => {
                              to = index
                            }}
                            onDragEnd={() => {
                              ShiftHandler(idx)
                            }}
                            onDragOver={(e) => {
                              e.preventDefault()
                            }}
                            className="catItem"
                          >
                            <div style={{ marginRight: '5px' }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-list"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                />
                              </svg>
                            </div>

                              

                            <input type="text" placeholder={category} onKeyDown={(e)=>{setCatName(e,index,idx)}}/>

                            <div
                              className="cancelCatIcon"
                              onClick={() => {
                                RemoveCat(index, idx)
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-x"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                              </svg>
                            </div>
                          </div>
                        )
                      })}

                      <div className="AddCatItem">
                        <input
                          type="text"
                          placeholder="New Category (Optional)"
                          onKeyDown={(e) => {
                            AddNewCat(e, idx)
                          }}
                          value={newCatt}
                          onChange={(e) => {
                            setNewCatt(e.target.value)
                          }}
                          ref={newCat}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items Belongings here */}
                  <div className="itemBelongingshead mt-3 mb-1">
                    <h4>Items</h4>
                    <h4>Belongings</h4>
                  </div>

                  <div className="itemsmain">
                    {question?.options.map((option, index) => {
                      return (
                        <div
                          className="itemsHead"
                          draggable
                          key={index}
                          onDragStart={() => {
                            itemstart = index
                          }}
                          onDragEnter={() => {
                            itemend = index
                          }}
                          onDragEnd={(e) => {
                            ShiftItems(e, idx)
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <div className="itemBelongings">
                            <div className="items">
                              <div style={{ marginRight: '5px' }}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  class="bi bi-list"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                  />
                                </svg>
                              </div>

                              <input type="text" placeholder={option.option} onKeyDown={(e)=>{setItemName(e,index,idx)}}/>
                              <div
                                className="cancelCatIcon"
                                onClick={() => {
                                  RemoveItem(index, idx)
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="currentColor"
                                  class="bi bi-x"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                              </div>
                            </div>

                            <div className="belongins">
                              <Box sx={{ minWidth: 150 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Belongs To
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={option.catOf}
                                    label="belong"
                                    onChange={(e) => {
                                      handleChange(e, index, idx)
                                    }}
                                  >
                                    {question?.categories.map(
                                      (category, index) => {
                                        return (
                                          <MenuItem value={category}>
                                            {category}
                                          </MenuItem>
                                        )
                                      },
                                    )}
                                  </Select>
                                </FormControl>
                              </Box>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Add new itemsbelongins input field here */}
                  <div className="itemsHead">
                    <div className="itemBelongings">
                      <div className="items">
                        <div
                          style={{ marginRight: '5px', visibility: 'hidden' }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-list"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </div>

                        <input
                          type="text"
                          placeholder="New Item (Optional)"
                          onKeyDown={(e) => {
                            AddNewItem(e, idx)
                          }}
                          onChange={(e) => {
                            setNewOptt(e.target.value)
                          }}
                          value={newOptt}
                        />

                        <div
                          className="cancelCatIcon"
                          
                          style={{ visibility: 'hidden' }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            class="bi bi-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </div>
                      </div>

                      <div className="belongins">
                        <Box sx={{ minWidth: 150 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Belongs To
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={catOfVal}
                              label="belong"
                              onChange={handleChangeAddNew}
                            >
                              {question?.categories.map((category, index) => {
                                return (
                                  <MenuItem value={category}>
                                    {category}
                                  </MenuItem>
                                )
                              })}
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="AddDelItemIcons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      AddNewQuestion(question?.questionType)
                    }}
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-trash3"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      RemoveQuestion(idx)
                    }}
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                  </svg>
                </div>
              </div>
  )
}

export default Categorize