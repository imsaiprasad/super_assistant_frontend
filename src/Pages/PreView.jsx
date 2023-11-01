import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button';
import axios from 'axios'


const FormView = () => {
  const [value, setValue] = useState('a')
  const [dragger,setDragger]=useState()
  const location = useLocation()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState(location?.state?.questions)
  
  const handleChange = (event,idx,index) => {

    setValue(event.target.value)

    
    let newArr = [...questions]

    let mainQues=newArr[idx]

    let question = mainQues.questions[index]
    
    question.answered=event.target.value

    mainQues.questions.splice(index,1,question)
    
    // console.log("idx",question.answered,"ok")

    newArr.splice(idx, 1, mainQues)

    setQuestions(newArr)

  }

  let first = null
  let last = null  

  function DragandDropHelper(idx) {
    let newArr = [...questions]
    let question = newArr[idx]

    let option = question.options[first].option

    question.options[first].settled = true

    question.catNoptions[last].responses.push(option)

    newArr.splice(idx, 1, question)

    setQuestions(newArr)
  }

  // Underscore String finder
  function isIt(str)
  {
    if(str){

      let count=0;
  
      for(let i of str)
      {
        if(i==='_')
        {
          count++;
        }
      }
  
      if(count===str.length)
      {
        return true
      }
    }

    return false
  }

  function textInsertHelper(idx,j)
  {
    let newArr = [...questions]
    let question = newArr[idx]

       if(isIt(question.PreviewArr[j])&&!isIt(question.respArr[j]))
       {
        return true;
       }

       return false;
  }

  function insertionHelper(idx,blankIndex)
  {

    let newArr = [...questions]
    let question = newArr[idx]

    let newArr2=[...question.respArr]
    newArr2[blankIndex]=question.ClozeOptions[dragger]

    question.respArr=newArr2

    newArr.splice(idx, 1, question)

    setQuestions(newArr)

  }


  function saveForm()
  {

    if(questions)
    {

      axios.post("http://localhost:9000/saveResponse",questions,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      
    })
    .then((res)=>{
      console.log("res",res)


    })
    .catch((e)=>{
      console.log("error",e)
    })

    }

    navigate("/submission")   

  }

  console.log('idx', location?.state?.questions)

  return (
    <div >
      {questions?.map((question, idx) => {
        return (
          <div style={{ margin: '30px' }}>
            {question.questionType === 'Categorize' ? (
              <div style={{ display: 'block', border: '1px solid black' }} className='borderRadius5'>
                <h4 className='m-3'>Question {idx + 1}</h4>

                <div style={{ display: 'flex', margin: '20px' }}>
                  {question?.options.map((option, index) => {
                    return (
                      <>
                        {!option.settled && (
                          <div
                            style={{
                              width: '100px',
                              margin: '10px',
                              minHeight: '30px',
                              textAlign: 'center',
                              border: '1px solid black',
                              borderRadius: '10px',
                            }}
                            draggable
                            onDragStart={(e) => {
                              first = index
                            }}
                            onDragEnd={() => {
                              DragandDropHelper(idx)
                            }}
                            onDragOver={(e) => {
                              e.preventDefault()
                            }}
                          >
                            {option.option}
                          </div>
                        )}
                      </>
                    )
                  })}
                </div>

                <div className="Container">
                  {question?.catNoptions.map((obj, index) => {
                    return (
                      <div className='col-3 m-3'>


                        <div
                          style={{  
                            minHeight: '200px',
                            backgroundColor: 'lightblue',
                            display:"flex",
                            alignItems:"center",
                            flexDirection:"column"
                          }}
                          onDragEnter={(e) => {
                            last = index
                          }}

                          className='borderRadius10'
                        >
                          {obj.responses.map((res, i) => {
                            return (
                              <div
                                style={{
                                  border: '1px solid black',
                                  margin: '10px',
                                  minHeight: '30px',
                                  textAlign: 'center',
                                  borderRadius: '10px',
                                }}
                                className='col-lg-8'
                              >
                                {res}
                              </div>
                            )
                          })}
                        </div>


                        <div
                          style={{
                            backgroundColor: 'pink',
                            textAlign: 'center',
                          }}

                          className='mt-3 p-2'
                        >
                          {obj.name}
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            ) : question.questionType === 'Comprehension' ? (
              <div style={{ display: 'block', border: '1px solid black' }} className='borderRadius5'>

                <div className='m-3'>

                <h4 style={{ margin: '10px' }}>Question {idx + 1}</h4>

                <div className="passage ">
                  {question?.description}
                </div>

                  </div>


                {question?.questions?.map((q, index) => {
                  return (
                    <div
                      style={{
                        display: 'block',
                        border: '1px solid black',
                        padding: '20px',
                        margin: '20px',
                      }}
                      className='borderRadius5'
                    >
                      <h4>
                        Question {idx + 1}.{index + 1}{' '}
                      </h4>

                      <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          <p className='passage'>{q.question}</p>
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={(event)=>{handleChange(event,idx,index)}}
                        >
                          {q?.options?.map((opt, j) => {
                            return (
                              <FormControlLabel
                                value={opt}
                                control={<Radio />}
                                label={opt}
                              />
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )
                })}
              </div>
            ) : question.questionType === 'Cloze' ? (
              <div style={{ display: 'block', border: '1px solid black' }} className='borderRadius5'>

                <h4 className='m-3'>Question {idx + 1}</h4>

                <div style={{ display: 'flex', margin: '30px' }}>
                  {question?.ClozeOptions?.map((option, index) => {
                    return (
                      <div
                        style={{
                          width: '100px',
                          margin: '10px',
                          minHeight: '30px',
                          textAlign: 'center',
                          borderRadius: '5px',
                          backgroundColor: '	#8A2BE2',
                          color:"white"
                        }}
                        key={index}
                        draggable
                        onDragStart={(e) => {
                          setDragger(index)
                        }}
                        onDragEnd={() => {
                          // DragandDropHelper(idx)
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                        }}
                      >
                        {option}
                      </div>
                    )
                  })}
                </div>

                <div className='d-flex m-3'>
                {question?.respArr?.map((str,j)=>{
                  return(
                    <span className='me-2'>

                      {isIt(str)||isIt(question?.PreviewArr[j]) ? <div style={{width:"150px",height:"30px",backgroundColor:"lightgrey",borderRadius:"5px",color:"white"}}  
                      onDragEnter={(e) => {             
                        insertionHelper(idx,j)
                      }} >

                        {textInsertHelper(idx,j)?
                        <div style={{width:"150px",height:"30px",borderRadius:"5px",backgroundColor: '#8A2BE2',textAlign:"center",color:"white"}}>
                             {str} 
                        </div>
                        :""}
                        
                      </div>

                      :

                      <div>
                        {str} 
                      </div>

                      }


                    </span>                  
                  )
                })}

                </div>

              </div>
            ) : (
              ''
            )}
          </div>
        )
      })}

      <div className='d-flex justify-content-center mb-4'>
      <Button variant="contained"  onClick={saveForm}>Submit</Button>  
      </div>
    </div>
  )
}

export default FormView