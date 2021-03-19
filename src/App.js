import React from 'react';
import logo from './logo.svg';
import './App.css';
import Produto from './Produto'
import ProdutoCarrinho from './ProdutoCarrinho'

class App extends React.Component {

  state = {
    valorInputMinimo: 100,
    valorInputMaximo: 500,
    valorInputNome: '',
    produtos: [
      {
        id: 1,
        produtoFoto: 'https://www.mindat.org/imagecache/71/e9/08031440014977519277454.jpg',
        produtoNome:'Chondrite',
        produtoPreco:200,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 2,
        produtoFoto: 'https://assets.catawiki.nl/assets/2019/9/25/8/d/7/8d70eed1-a1a1-4cd5-8b0b-fe41f8eb8e88.jpg',
        produtoNome:'Enstatita',
        produtoPreco:300,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        id: 3,
        produtoFoto: 'https://www.mindat.org/imagecache/cb/bf/08031870014977519275126.jpg',
        produtoNome:'Creuza',
        produtoPreco:400,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      }
    ],
    // produtosCarrinho: this.state.produtos,
    carrinhoTotal: 0
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

  // criaTarefa = () => {
  //   const novaTarefa = {
  //     id: Date.now(),    // ! método novo! 
  //     texto: this.state.inputValue, //! sempre receber o valor do input que foi para o estado!
  //     completa: false
  //   }
  //   const novasTarefas = [...this.state.tarefas, novaTarefa]
  //   this.setState({ tarefas: novasTarefas })
  //   console.log('Tarefa Criada!')
  // }


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
          // produtoNome:'NovoNome',
          carrinhoQuantidade: 0,
          carrinhoPreco: 0,
          // carrinhoQuantidade: 1
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
          // produtoNome:'NovoNome',
          carrinhoQuantidade: produto.carrinhoQuantidade - 1,
          carrinhoPreco: produto.carrinhoPreco - produto.produtoPreco,
          // carrinhoQuantidade: 1
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



  render() {

    const produtosCarrinho = this.state.produtos.filter ( produto => {
      if (produto.carrinhoQuantidade > 0) {
        return true
      }
    })

    const valorTotalCarrinho = this.state.produtos.reduce ( (total, produto) => {
      return total + produto.carrinhoPreco
    }, 0) 


    // const precoCarrinho = this.state.produtos.filter ( produto => {
    //   const precoTotalCarrinho = 0
    //   if (produto.carrinhoQuantidade > 0) {
    //     precoTotalCarrinho + produtoPreco
    //     return precoTotalCarrinho
    //   }
    // })



    const produtoFiltrado = this.state.produtos.filter ( produto => {

        //REGEX para o filtro por palavra com apenas algumas letras
        let regex = new RegExp('['+this.state.valorInputNome+']{4,}', "gmi")
        let resultadoBusca = regex.test(produto.produtoNome)

        if ((
          produto.produtoNome === this.state.valorInputNome || 
          this.state.valorInputNome === '' 
          ) 
        && produto.produtoPreco >= this.state.valorInputMinimo && produto.produtoPreco <= this.state.valorInputMaximo ) {
            return true
        } else if (resultadoBusca) {
          return true
        }
        return false
    })


    return (
      <div className="app-container">
        <div className='app-filtro'>
          <h4>Filtros: </h4>
          <div className='app-inputs'>
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
          <h4>Quantidade de produtos: </h4> 
          <div className='app-cards'>


          {produtoFiltrado.map(produto => {
            return (
              <Produto 
                produtoFoto={produto.produtoFoto}
                produtoNome={produto.produtoNome}
                produtoPreco={`R$`+ produto.produtoPreco}
                textoBotao={'Adicionar ao carrinho?'}
                funcao={() => this.onClickAdicionarAoCarrinho(produto.produtoNome)}

              />
              //   {'clique para função'}
              // </Produto>
  
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
            Valor Total: R$ {valorTotalCarrinho}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
