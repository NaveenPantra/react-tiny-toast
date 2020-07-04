import React, { useState, useRef } from 'react';
import {
  toast, POSITIONS, VARIANTS, ToastOptionsInterface, ToastContainer
} from 'react-tiny-toast';

export default {
  title: 'Documentation & Examples',
  component: ToastContainer
}

export const withDifferentToastOptions = () => {
  const previewCodeRef = useRef(null)
    const [options, updateOptions] = useState<ToastOptionsInterface>({
      timeout: 2000,
      variant: 'success',
      pause: false,
      delay: 0,
      position: POSITIONS.TOP_CENTER,
      uniqueCode: ''
    })
    const toastText = `Toast which dismisses in ${options.timeout} ms`
    const onClick = () => {
      const { variant, timeout, pause, delay, position, uniqueCode } = options;
      toast.show(
        toastText,
        { timeout, pause, variant, delay, position, uniqueCode }
      )
    }

    const onChange = (event) => {
      const { dataset: { property }, value } = event.currentTarget
      updateOptions({
        ...options,
        [property]: value
      })
    }

    const onClickPauseCheckbox = (event) => {
      updateOptions({
        ...options,
        pause: event.currentTarget.checked
      })
    }

    const onClickCopy = async () => {
      if('clipboard' in window.navigator) {
        try {
          const previewCode = previewCodeRef.current && previewCodeRef.current.innerText;
          if(previewCode) await window.navigator.clipboard.writeText(previewCode)
          toast.show('Successfully copied!', { variant: VARIANTS.SUCCESS })
        } catch(e) {
          toast.show('Error while copying your code.', { variant: VARIANTS.DANGER })
        }
      } else {
        toast.show(`Your browser doesn't support copying feature.`, { variant: VARIANTS.WARNING })
      }
    }
    return (
      <div className='main-container'>
        <div className='form-container'>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <select onChange={onChange} data-property='variant'>
              {Object.values(VARIANTS).map((variant, i) => <option key={i} value={variant}>{variant}</option>)}
            </select>
            <h5 style={{margin: 0}}>Toast variants available.</h5>
          </div>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <select onChange={onChange} data-property='position'>
              {Object.values(POSITIONS).map((position, i) => <option key={i} value={position}>{position}</option>)}
            </select>
            <h5 style={{margin: 0}}>Position of the toast to appear on your application.</h5>
          </div>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <input type='checkbox' checked={options.pause} onClick={onClickPauseCheckbox}/>
            <h5 style={{margin: 0}}>Pause the toast after its shown.</h5>
          </div>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <input type='number' data-property='timeout' value={options.timeout} onChange={onChange}/>
            <h5 style={{margin: 0}}>Total time the toast is active before it disappears from UI.</h5>
          </div>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <input type='number' data-property='delay' value={options.delay} onChange={onChange}/>
            <h5 style={{margin: 0}}>Delay in ms. after which the user sees this toast message.</h5>
          </div>
          <div style={{display: 'inline-flex', marginTop: 8}}>
            <input type='text' data-property='uniqueCode' value={options.uniqueCode} onChange={onChange}/>
            <h5 style={{margin: 0}}>Unique code to avoid multiple toast for same code.</h5>
          </div>
          <button onClick={onClick} style={{width: 100}}>Show Toast</button>
          <div>Your Toast Code below: <button onClick={onClickCopy}>Copy</button></div>
          <code ref={previewCodeRef} style={{color: 'white', backgroundColor: 'black', padding: 8, borderRadius: 4}}>
            {`toast.show(
              '${toastText}',
              { timeout: ${options.timeout}, pause: ${options.pause}, variant: '${options.variant}', delay: ${options.delay}, position: '${options.position}' ${options.uniqueCode ? `, uniqueCode: ${options.uniqueCode}` : ''}})`}
          </code>
        </div>
      </div>
    )
}

export const StickyToast = () => {
  let toastId = null;
    const onClickClose = () => {
      toast.remove(toastId)
    }
    toastId = toast.show(
      <div>Click cross icon to remove the toast. <div style={{cursor: 'pointer', display: 'inline-block'}} onClick={onClickClose}>X</div></div>,
      { pause: true }
    )
    return (
      <div className='main-container'>
        <div className='form-container'>
          <code style={{color: 'white', backgroundColor: 'black', padding: 8, borderRadius: 4}}>
            <div>{`let toastId = null;\n`}</div>
            <div>{`const onClickClose = () => {`}</div>
              <div>{`toast.remove(toastId);`}</div>
            <div>{`}`}</div>
            <div>{`toastId = toast.show(`}</div>
              <div>{`<div>Click cross icon to remove the toast. <div style={{cursor: 'pointer', display: 'inline-block'}} onClick={onClickClose}>X</div></div>,`}</div>
              <div>{`{ pause: true }`}</div>
            <div>{`)`}</div>
          </code>
        </div>
      </div>
    )
}


export const CustomToast = () => {
  let toastId = null;
    const onClickClose = () => {
      toast.remove(toastId)
    }
    toastId = toast.show(
      <div>Click cross icon to remove the toast. <div style={{cursor: 'pointer', display: 'inline-block'}} onClick={onClickClose}>X</div></div>,
      { pause: true, className: 'custom-react-tiny-toast' }
    )
    return (
      <div className='main-container'>
        <div className='form-container'>
          <code style={{color: 'white', backgroundColor: 'black', padding: 8, borderRadius: 4}}>
            <span>{`let toastId = null;\n`}</span><br/>
            <span>{`const onClickClose = () => {`}</span><br/>
              <span>&nbsp;&nbsp;{`toast.remove(toastId);`}</span><br/>
            <span>{`}`}</span><br/>
            <span>{`toastId = toast.show(`}</span><br/>
              <span>&nbsp;&nbsp;{`<div>Click cross icon to remove the toast. <div style={{cursor: 'pointer', display: 'inline-block'}} onClick={onClickClose}>X</div></div>,`}</span><br/>
              <span>&nbsp;&nbsp;{`{ pause: true, className: 'custom-react-tiny-toast' }`}</span><br/>
            <span>{`)`}</span><br/>
          </code>
          <div style={{marginTop: 8}}>Your css code be like this:</div>
          <code style={{color: 'white', backgroundColor: 'black', padding: 8, borderRadius: 4}}>
            <span style={{color: 'orange'}}>{`.custom-react-tiny-toast`}</span><span>{` {`}</span><br/>
            <span>&nbsp;&nbsp;{`color: grey;`}</span><br/>
            <span>&nbsp;&nbsp;{`background-color: greenyellow;`}</span><br/>
            <span>&nbsp;&nbsp;{`border: 1px solid red;`}</span><br/>
            <span>{`}`}</span>
          </code>
        </div>
      </div>
    )
}