import React from 'react';
import './App.css';
import Produto from './Produto'
import ProdutoCarrinho from './ProdutoCarrinho'

class App extends React.Component {

  state = {
    valorSelectOrdem: 'decrescente',
    valorInputMinimo: 100,
    valorInputMaximo: 800,
    valorInputNome: '',
    produtos: [
      {
        id: 1,
        produtoFoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/NWA869Meteorite.jpg/220px-NWA869Meteorite.jpg',
        produtoNome:'Amanhecer',
        produtoPreco:600,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 2,
        produtoFoto: 'https://www.mindat.org/imagecache/71/e9/08031440014977519277454.jpg',
        produtoNome:'Enstatita',
        produtoPreco:300,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 3,
        produtoFoto: 'https://www.mindat.org/imagecache/cb/bf/08031870014977519275126.jpg',
        produtoNome:'Druida',
        produtoPreco:400,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 4,
        produtoFoto: 'https://qmag.com///wp-content/uploads/2016/10/magnetite_on_white-300x265.jpg',
        produtoNome:'Elementosa',
        produtoPreco:450,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 5,
        produtoFoto: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Allan_Hills_81005%2C_lunar_meteorite.jpg',
        produtoNome:'Lunar',
        produtoPreco:500,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 6,
        produtoFoto: 'https://assets.catawiki.nl/assets/2019/9/25/8/d/7/8d70eed1-a1a1-4cd5-8b0b-fe41f8eb8e88.jpg',
        produtoNome:'Chondrite',
        produtoPreco:250,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      }

    ],
    // produtosCarrinho: this.state.produtos,
    carrinhoTotal: 0
  }
  
  onChangeSelectOrdem = (event) => {
    this.setState( { valorSelectOrdem: event.target.value } )
  }
  onChangeInputMinimo = (event) =>{
    this.setState( { valorInputMinimo: event.target.value } )
  }
  
  onChangeInputMaximo = (event) => {
    this.setState( { valorInputMaximo: event.target.value } )
  }
  
  onChangeInputNome =(event) => {
    this.setState( { valorInputNome: event.target.value } )
  }

  onClickAdicionarAoCarrinho = (produtoNome) => {

    const novosProdutos = this.state.produtos.map((produto) => {
      if(produtoNome === produto.produtoNome) {
        const novoProduto = {
          ...produto,
          // produtoNome:'NovoNome',
          carrinhoQuantidade: produto.carrinhoQuantidade + 1,
          carrinhoPreco: produto.carrinhoPreco + produto.produtoPreco,
          // carrinhoQuantidade: 1
        }
        return novoProduto
      } else {
        return produto
      }
    })
    this.setState ({ produtos: novosProdutos })
  }

  onClickDeletar = (produtoNome) => {
    const novosProdutos = this.state.produtos.map((produto) => {
      if(produtoNome === produto.produtoNome) {
        const novoProduto = {
          ...produto,
          carrinhoQuantidade: 0,
          carrinhoPreco: 0,
        }
        return novoProduto
      } else {
        return produto
      }
    })
    this.setState ({ produtos: novosProdutos })

  }

  onClickDiminuir = (produtoNome) => {
    const novosProdutos = this.state.produtos.map((produto) => {
      if(produtoNome === produto.produtoNome) {
        const novoProduto = {
          ...produto,
          carrinhoQuantidade: produto.carrinhoQuantidade - 1,
          carrinhoPreco: produto.carrinhoPreco - produto.produtoPreco,
        }
        return novoProduto
      } else {
        return produto
      }
    })
    this.setState ({ produtos: novosProdutos })
  }

  onClickAumentar = (produtoNome) => {
    const novosProdutos = this.state.produtos.map((produto) => {
      if(produtoNome === produto.produtoNome) {
        const novoProduto = {
          ...produto,
          carrinhoQuantidade: produto.carrinhoQuantidade + 1,
          carrinhoPreco: produto.carrinhoPreco + produto.produtoPreco,
        }
        return novoProduto
      } else {
        return produto
      }
    })
    this.setState ({ produtos: novosProdutos })
  }

  render() {

    const produtoFiltrado = this.state.produtos.filter ( produto => {
      
        //REGEX para o filtro por palavra com apenas algumas letras
        let regex = new RegExp('['+this.state.valorInputNome+']{4,}', "gmi")
        let resultadoBusca = regex.test(produto.produtoNome)

        if ((
          produto.produtoNome === this.state.valorInputNome || 
          this.state.valorInputNome === '' ||
          resultadoBusca
          ) 
        && produto.produtoPreco >= this.state.valorInputMinimo && produto.produtoPreco <= this.state.valorInputMaximo ) {
            return true
        }
        return false
    })

    //ORDENAÇÃO COM MÉTODO SORT
    const produtoOrdenado = produtoFiltrado.sort( (a, b) => {
    return this.state.valorSelectOrdem === 'crescente' ? 
    a.produtoPreco - b.produtoPreco : b.produtoPreco - a.produtoPreco 
    })

    const valorTotalProdutos = produtoFiltrado.reduce ( (total, produto) => {
      return total + 1
    }, 0) 


    const produtosCarrinho = this.state.produtos.filter ( produto => {
      if (produto.carrinhoQuantidade > 0) {
        return true
      }
    })

    const valorTotalCarrinho = this.state.produtos.reduce ( (total, produto) => {
      return total + produto.carrinhoPreco
    }, 0) 


    return (
      <div className="app-container">
        <div className='app-filtro'>
          <h4>Filtros: </h4>
          <div className='app-inputs'>
          <p>Ordem</p>
            <select 
            value={this.state.valorSelectOrdem}
            onChange={this.onChangeSelectOrdem}
            >
              <option value='crescente'>Crescente</option>
              <option value='decrescente'>Decrescente</option>
            </select> 

            <p>Valor Mínimo</p>
            <input
                type='number'
                className='minimo'
                value={this.state.valorInputMinimo}
                onChange={this.onChangeInputMinimo}
                // placeholder={'Valor mínimo'}
              /> 
            <p>Valor Máximo</p>
              <input
                type='number'
                className="maximo"
                value={this.state.valorInputMaximo}
                onChange={this.onChangeInputMaximo}
                placeholder={'Valor máximo'}
                // onKeyDown={this.onKeyDown}
              /> 
            <p>Busca por Nome</p>
              <input
                className="busca-nome"
                value={this.state.valorInputNome}
                onChange={this.onChangeInputNome}
                placeholder={'Digite o nome'}
                // onKeyDown={this.onKeyDown}
              /> 
          </div>
        </div>
        <div className='app-produtos'>
          <h4>Quantidade de produtos: {valorTotalProdutos} </h4> 
          <div className='app-cards'>


          {produtoOrdenado.map(produto => {
            return (
              <Produto 
                produtoFoto={produto.produtoFoto}
                produtoNome={produto.produtoNome}
                produtoPreco={`R$`+ produto.produtoPreco+`,00`}
                textoBotao={'Adicionar ao carrinho'}
                funcao={() => this.onClickAdicionarAoCarrinho(produto.produtoNome)}

              />
  
            )
          })}
          </div>
        </div>
        <div className='app-carrinho'>
          <h4>Carrinho: </h4>
          <div className='app-carrinhos-produtos'>

          {produtosCarrinho.map( produto => {
            return (
            <ProdutoCarrinho 
              carrinhoQuantidade={produto.carrinhoQuantidade}
              produtoNome={produto.produtoNome}
              funcaoCarrinhoDeletar={() => this.onClickDeletar(produto.produtoNome)}
              funcaoCarrinhoAumentar={() => this.onClickAumentar(produto.produtoNome)} 
              funcaoCarrinhoDiminuir={() => this.onClickDiminuir(produto.produtoNome)} 
 
            />
            )
          })}
            <div className='valor-total'>
            Valor Total: R$ {valorTotalCarrinho},00
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
