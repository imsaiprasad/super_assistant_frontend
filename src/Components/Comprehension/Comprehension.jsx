import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


const Comprehension = ({question,idx,questions,setQuestions,AddNewQuestion,RemoveQuestion,AddPoints}) => {


  function passageSetter(e,idx)
    {
  
      if(e.key==="Enter"){
  
        let obj=questions[idx]
  
        obj.description=e.target.value
  
        let newArr=[...questions]
  
        newArr.splice(idx,1,obj)
  
        setQuestions(newArr)
        console.log("idx",questions)
      }
  
    }

  function submitPoints(e)
  {

    if(e.key==='Enter'&&e.target.value)
    {
      AddPoints(e.target.value,idx)
      
    }
      
  }

  function DeletePassageQuestion(idx,j)
  {
    console.log("idx",idx,j)
    let question=questions[idx]
    let newArr=[...question.questions]

    newArr.splice(j,1)
    question.questions=newArr
    let mainArr=[...questions]
    mainArr.splice(idx,1,question)
    setQuestions(mainArr)
  }

  function passageQuestionSetter(e,idx,j)
  {
    if(e.key==="Enter")
    {
      let question=questions[idx]
  
      let newArr=[...question.questions]
  
      let thatObj=newArr[j]

      thatObj.question=e.target.value

      newArr.splice(j,1,thatObj)

      question.questions=newArr
      
      let mainArr=[...questions]
      mainArr.splice(idx,1,question)
      setQuestions(mainArr)


      console.log("idx",e.target.value,"  ",questions)

    }
  }

  function PassageOptionSetter(e,idx,j,k)
  {

    if(e.key==="Enter")
    {
      let question=questions[idx]
  
      let newArr=[...question.questions]
  
      let optArray=[...newArr[j].options]

      optArray.splice(k,1,e.target.value)

      
      newArr[j].options=optArray
      
      question.questions=newArr
      
      let mainArr=[...questions]
      mainArr.splice(idx,1,question)
      setQuestions(mainArr)

      console.log("idx",questions)

    }

  }

  function PassageNewOptionCreate(e,idx,j)
  {
    if(e.key==="Enter")
    {
      let question=questions[idx]
  
      let newArr=[...question.questions]
  
      let optArray=[...newArr[j].options]

      optArray.push(e.target.value)
    
      newArr[j].options=optArray
      
      question.questions=newArr
      
      let mainArr=[...questions]
      mainArr.splice(idx,1,question)
      setQuestions(mainArr)
      console.log("idx",questions)


    }
  }

  function AddPassageQuestion(idx)
  {

    let question=questions[idx]

    //question ---> questions(array)

    let obj=  {
      question: 'Enter Question here',
      options: ['option1', 'option2','option3','option4'],
    }

    let newArr=[...question.questions]

    newArr.push(obj)
    question.questions=newArr
    
    let mainArr=[...questions]
    mainArr.splice(idx,1,question)
    setQuestions(mainArr)
  }
 

  console.log("questions",questions)

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

               <div >
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Passage"
                      placeholder="Type Passage Here"
                      multiline
                      onKeyDown={(e)=>{passageSetter(e,idx)}}
                    />
                  </Box>

                  </div>


                  <div>
                    {question.questions.map((val, j) => {
                      return (
                        <div style={{ display: 'flex' }}>
                          <div
                            style={{
                              border: '1px solid black',
                              margin: '20px 0px 20px 20px',
                              padding: '10px',
                              marginTop: '40px',
                            }}
                          >
                            
                  <h2>Question {idx + 1} : </h2>

                            <input
                              type="text"
                              placeholder={val.question}
                              style={{ width: '400px', margin: '20px' }}
                              onKeyDown={(e)=>{passageQuestionSetter(e,idx,j)}}
                            />
                            {val.options?.map((opt, k) => {
                              return (
                                <div>
                                  option {k + 1} :{' '}
                                  <input
                                    type="text"
                                    placeholder={opt}
                                    style={{ width: '250px', margin: '10px' }}
                                    onKeyDown={(e)=>{PassageOptionSetter(e,idx,j,k)}}
                                  />
                                </div>
                              )
                            })}
                            Add option{' '}
                            <input
                              type="text"
                              style={{ width: '250px', margin: '10px' }}
                              placeholder="New Option"
                              onKeyDown={(e)=>{PassageNewOptionCreate(e,idx,j)}}
                            />
                          </div>

                          <div
                            className="AddDelItemIcons"
                            style={{ marginTop: '40px' }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-plus-circle-fill"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                
                                AddPassageQuestion(idx)
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
                              DeletePassageQuestion(idx,j)
                              }}
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </div>
                        </div>
                      )
                    })}
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
                      AddNewQuestion("Comprehension")
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

export default Comprehension