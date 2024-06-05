import React from 'react';

class ClassState extends React.Component {
  constructor(){
    super();
    this.state = {
      error: false,
      loading: false,
    };
  }

  componentDidUpdate(){
    if(this.state.loading){
      setTimeout(() => {
        console.log("Haciendo la validación");
        this.onChangeLoading()
        console.log("Terminando la validación")
      }, 3000);
    }
  }

  onChangeError(){
    this.setState({
      ...this.state,
      error: !this.state.error,
    })
  };

  onChangeLoading(){
    this.setState({
      ...this.state,
      loading: !this.state.loading,
    })
  }  

  render(){
    const {name} = this.props;

    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>
        {
          this.state.error && (
            <p>Error: El código es incorrecto</p>
          )
        }
        {
          this.state.loading && (
            <p>Cargando...</p>
          )
        }
        <input placeholder="Código de seguridad"/>
        <button onClick={this.onChangeLoading.bind(this)}>Comprobar</button>
      </div>
    )
  }
}

export { ClassState }