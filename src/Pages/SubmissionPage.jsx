import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SubmissionPage = () => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <CheckCircleIcon style={{color:"green"}} />
        <div  className='m-3'>


            <div style={{fontWeight:"700",fontSize:"25px"}}>
                Test Completed
            </div>

            <div>
                Congratulations! Your responses have been recorded. You may close this tab.
             </div>
        </div>
    </div>
  )
}

export default SubmissionPage