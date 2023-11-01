import './App.css'
import * as React from 'react';
import { useState } from 'react'
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import Comprehension from './Components/Comprehension/Comprehension'
import Categorize from './Components/Categorize/Categorize'
import Cloze from "./Components/Cloze/Cloze"
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [questions, setQuestions] = useState([
    {
      questionType: 'Categorize',
      points:0,
      description: '',
      categories: ['cat1', 'cat2'],
      catNoptions:[{
        name:"cat1",
        responses:[]
      },
      {
        name:"cat2",
        responses:[]
      }],
      options: [
        {
          option: 'item1',
          catOf: 'cat1',
          settled:false
        },
      ],
    },
    {
      questionType: 'Cloze',
      points:0,
      Sentence:'',
      Preview:'',
      SentenceArr:[],
      PreviewArr:[],
      respArr:[],
      ClozeOptions:[]      
    },
    {
      questionType: 'Comprehension',
      points:0,
      description: '',
      questions: [
        {
          question: 'Enter Question here',
          options: ['option1', 'option2','option3','option4'],
          answered:""
        },
      ],
    }
    
  ])

  const [respData,setRespData]=useState([])

  const [previewShow,setPreviewShow]=useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const navigate=useNavigate()


  function AddNewQuestion(questionType) {
    if (questionType === 'Categorize') {

      let NewQuest = {
        questionType: questionType,
        points:0,
        description: "",
        categories: ['cat1'],
        catNoptions:[{
          name:"cat1",
          responses:[]
        }],
        options: [
          {
            option: 'item1',
            catOf: 'cat1',
            settled:false
          },
          {
            option: 'item2',
            catOf: 'cat1',
            settled:false

          },
        ],
      }

      console.log("idx",NewQuest)

      let MainArr = [...questions]
      MainArr.push(NewQuest)
      setQuestions(MainArr)
    }
    else if(questionType === 'Comprehension')
    {

      let NewQuest = {
        questionType: questionType,
        points:0,
        description: "",
        questions: [
          {
            question: '',
            options: ['option1','option2','option3','option4'],
            answered:""
          },
        ],     
      }

      let MainArr = [...questions]
      MainArr.push(NewQuest)
      setQuestions(MainArr)

    }
    else if(questionType === 'Cloze')
    {

      let NewQuest = {
        questionType: 'Cloze',
        points:0,
        Sentence:'',
        Preview:'',
        SentenceArr:[],
        PreviewArr:[],
        respArr:[],
        ClozeOptions:[]       
      }

      let MainArr = [...questions]
      MainArr.push(NewQuest)
      setQuestions(MainArr)

    }
  }

  function RemoveQuestion(idx) {
    let MainArr = [...questions]
    MainArr.splice(idx, 1)
    setQuestions(MainArr)
  }
 
 

  function AddPoints(points,idx)
  {
    if(idx>=0&&points>=0)
    {
      let ques=questions[idx]
      ques.points=points

      let MainArr = [...questions]
      MainArr.splice(idx, 1,ques)
      setQuestions(MainArr)

      // console.log("idx",questions)
    }
  }

  function splitSentence()
  {
      let finalQues=[...questions]

      for(let question of finalQues)
      {
        if(question.questionType==="Cloze")
        {
         
          question.SentenceArr=question?.Sentence?.split(" ")
          question.PreviewArr=question?.Preview?.split(" ")
          question.respArr=question?.Preview?.split(" ")
        }
      }

      setQuestions(finalQues)

      
    }
    
    console.log("idx",questions)

 

  function saveForm()
  {

    splitSentence()

    axios.post("http://localhost:9000/saveForm",questions,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }
      
    })
    .then((res)=>{
      console.log("res",res)

      if(res.data.status==="successful")
      {
        setRespData(res.data.result.questions)
        setPreviewShow(true)
        handleClick()
      }

    })
    .catch((e)=>{
      console.log("error",e)
    })
  }

  function preview(e)
  {
    splitSentence()
    navigate("/preview",{state:{questions:respData}})
  }

  return (
    <div>

      {questions?.map((question, idx) => {
        return (
          <div className='question'>
            {question?.questionType === 'Categorize' ? (
              <Categorize  setQuestions={setQuestions} questions={questions} question={question} idx={idx} 
              RemoveQuestion={RemoveQuestion} AddNewQuestion={AddNewQuestion} AddPoints={AddPoints} />
            ) : question?.questionType === 'Comprehension' ? (

              <Comprehension question={question} questions={questions} setQuestions={setQuestions} idx={idx} 
              RemoveQuestion={RemoveQuestion} AddNewQuestion={AddNewQuestion} AddPoints={AddPoints}/>

            ) : (
              <Cloze question={question} idx={idx} questions={questions} setQuestions={setQuestions}
               RemoveQuestion={RemoveQuestion} AddNewQuestion={AddNewQuestion} AddPoints={AddPoints}/>
            )}
          </div>
        )
      })}


      <div style={{margin:"20px",display:"flex",justifyContent:"center"}}>
        <span style={{margin:"10px"}}>

        <Button variant="contained" onClick={saveForm}>Save</Button>
        </span>

        <span style={{margin:"10px"}}>
      {previewShow && <Button variant="contained" onClick={preview}>Preview</Button>}

        </span> 

      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Form Created Successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
