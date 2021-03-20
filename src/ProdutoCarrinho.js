import React from 'react'
// import './Produto.css'

class ProdutoCarrinho extends React.Component {
  state = {

  }


  render() {

    return <div className='produto-carrinho-container'>                
                <div>{this.props.carrinhoQuantidade} - {this.props.produtoNome} 
                <button onClick={this.props.funcaoCarrinhoAumentar}>+</button>
                <button onClick={this.props.funcaoCarrinhoDiminuir}>-</button>
                <button onClick={this.props.funcaoCarrinhoDeletar}>Remover Tudo</button>

                </div>
            </div>
  }

}

export default ProdutoCarrinho 