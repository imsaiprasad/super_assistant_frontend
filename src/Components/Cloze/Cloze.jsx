import React, { useState } from 'react';

function Cloze({question,idx,questions,AddNewQuestion,RemoveQuestion,setQuestions,AddPoints}) {

  const [selectedText, setSelectedText] = useState('');
  const [sentence,setSentence]=useState(question.Sentence)
  const [preview,setPreview]=useState(question.Preview)

  let itemstart = null
  let itemend = null

  const handleHighlight = () => {

    if (selectedText) {
      const cloze = '_'.repeat(selectedText.length);
      
      const modified=preview.replace(selectedText, cloze)
      let obj=questions[idx]

      obj.ClozeOptions.push(selectedText);
      
        setPreview(modified)
        obj.Preview=modified;
        obj.Sentence=sentence; 

      let newArr=[...questions]

      newArr.splice(idx,1,obj)

      setQuestions(newArr)

      setSelectedText("")

    }

  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      setSelectedText(selection.toString());
    }
  }

  const sentenceTextSetter=(e)=>
  {
    setSentence(e.target.value)
    setPreview(e.target.value)

  }

  const sentenceSetter=(e)=>{

    if(e.key==="Enter"){
  
      let obj=questions[idx]

      obj.Sentence=e.target.value
      obj.Preview=e.target.value

      let newArr=[...questions]

      newArr.splice(idx,1,obj)

      setQuestions(newArr)

      console.log("idx",questions)
    }

  }

  function ShiftItems(e, idx) {
    console.log('idx', itemstart, itemend)

    let obj = questions[idx]

    let newArr = obj.ClozeOptions //options array

    let fromEle = newArr[itemstart]

    newArr.splice(itemstart, 1)

    newArr.splice(itemend, 0, fromEle)

    obj.ClozeOptions = newArr

    let MainArr = [...questions]

    MainArr.splice(idx, 1)
    MainArr.splice(idx, 0, obj)

    setQuestions(MainArr)

  }

  function PassageNewOptionCreate(e,idx)
  {
    if(e.key==="Enter"&&e.target.value)
    {
      let question=questions[idx]

      question.ClozeOptions.push(e.target.value)

      let mainArr=[...questions]
      mainArr.splice(idx,1,question)
      setQuestions(mainArr)

      console.log("idx",question)


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
    <div className='d-flex'>

    <div className="border col-lg-12 p20">

     
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

      <div className='preview m-3'>

        <div style={{fontWeight:"700"}} className='m-2'>
        Preview
        </div>

        <div >

          <input type='text' className='col-lg-12' value={preview}/>
        
      </div>

      </div>

      <button onClick={handleHighlight} className='m-2' title="Highlight text in sentence and click me to add option">U</button>


      <div className='Sentence m-3'>

        <div style={{fontWeight:"700"}} className='m-2'>
        Sentence*
        </div>

        <div >

          <input type='text' className='col-lg-12' value={sentence} onChange={sentenceTextSetter}
           onKeyDown={sentenceSetter} onMouseUp={handleTextSelection}/>
        
      </div>

      </div>


          <div className="itemsmain m-3">
                    {question?.ClozeOptions?.map((option, index) => {
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

                              <input type="text" value={option} />
                              
                              
                            </div>
                           
                          </div>

                        </div>
                      )
                    })}

                       {question?.ClozeOptions?.length>0 && <div className='d-block ms-4'>
                            
                            <input
                              type="text"
                              style={{ margin: '10px' }}
                              
                              placeholder={"Add Option (Optional)"}
                              onKeyDown={(e)=>{PassageNewOptionCreate(e,idx)}}
                            />

                           </div>
                  }
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
                      AddNewQuestion("Cloze")
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
  );
}
export default Cloze;