import React from 'react'
import './Produto.css'

class Produto extends React.Component {
  state = {

  }

  onClickAdicionarAoCarrinho = () => {
    this.setState({
      noCarrinho: !false,
      numeroCarrinho: this.state.numeroCarrinho + 1,
      precoCarrinho: this.precoCarrinho + this.props.produtoPreco,
    })
  }

  render() {

    return <div className='produto-container'>
              <div className='produto-foto'>
                  <img className={'foto'} src={this.props.produtoFoto} alt={'Imagem do produto'}/>
              </div>
              <div className='produto-texto'>
                <div className='produto-dados'>
                  
                  <p>{this.props.produtoNome}</p>
                  <p>{this.props.produtoPreco}</p>
                </div>
                
                <div className='produto-botao'>
                    <button onClick={this.props.funcaoBotao}> {this.props.textoBotao} </button>
                </div>

              </div>
            </div>
  }

}

export default Produto 