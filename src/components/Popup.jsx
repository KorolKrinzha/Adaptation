import { ReactComponent as CloseButton} from '../assets/cross.svg' 
import '../styles/style.css'


const Popup = ({title, setModalOpen, Component}) =>{
    return (
        <div className="container -lg">
          <div className="sections">
            <div className="d-flex flex-row-reverse">
            <button className='svg-button'
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <CloseButton/>
          </button>
            </div>
            
              <h1 className="text-title">{title}</h1>
            
            <div className="body">

                <Component></Component>

            </div>
          </div>
        </div>
      );
    }

export default Popup