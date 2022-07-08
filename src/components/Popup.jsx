const Popup = ({title, setModalOpen, Component}) =>{
    return (
        <div className="container -lg">
          <div className="sections">
            <div className="titleCloseBtn">
            <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
            </div>
            
              <h1 className="title">{title}</h1>
            
            <div className="body">

                <Component></Component>

            </div>
          </div>
        </div>
      );
    }

export default Popup