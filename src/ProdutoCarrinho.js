import React from 'react'
// import './Produto.css'

class ProdutoCarrinho extends React.Component {
  state = {

  }


  render() {

    return <div className='produto-container'>                
                <div>{this.props.carrinhoQuantidade} - {this.props.produtoNome} 
                <button>Apagar</button>
                </div>
            </div>
  }

}

export default ProdutoCarrinho 