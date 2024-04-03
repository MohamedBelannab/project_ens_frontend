
import { Metronome } from '@uiball/loaders'
const Loading = () => {
    const css = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: '50'
      };
  return (
    <>

    <div className='fixed' style={css}>
      .
    <Metronome 
    size={40}
    speed={1.6} 
    color="blue" 
    />
    </div>
    
    </>
  )
}

export default Loading