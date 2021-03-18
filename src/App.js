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
        produtoFoto: 'https://www.mindat.org/imagecache/71/e9/08031440014977519277454.jpg',
        produtoNome:'Chondrite',
        produtoPreco:200,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        produtoFoto: 'https://assets.catawiki.nl/assets/2019/9/25/8/d/7/8d70eed1-a1a1-4cd5-8b0b-fe41f8eb8e88.jpg',
        produtoNome:'Enstatite',
        produtoPreco:300,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      },
      {
        produtoFoto: 'https://www.mindat.org/imagecache/cb/bf/08031870014977519275126.jpg',
        produtoNome:'Lucrecio',
        produtoPreco:400,
        carrinhoQuantidade: 0,
        carrinhoPreco: 0,
      }
    ],
    produtosCarrinho: [''],
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


  onClickAdicionarAoCarrinho = () => {


    const novoProdutoNoCarrinho = {
      carrinhoQuantidade: this.produto.carrinhoQuantidade + 1,
      produtoNome: this.produto.nome, 
      carrinhoPreco: this.produto.carrinhoPreco + this.produto.produtoPreco,
    }
    const NovosProdutosNoCarrinho = [...this.state.produtosCarrinho, novoProdutoNoCarrinho]
    this.setState({ produtosCarrinho:  NovosProdutosNoCarrinho })
  }

  // deletar = () => {
  //   this.setState({ this.state.produtos.produtosCarrinho.filter... :  })
  //   atualiza, o q foi deletado.
  // }

  render() {

    const produtosCarrinho = this.state.produtos.filter ( produto => {
      if (produto.carrinhoQuantidade > 0) {
        return true
      }
    })


    const produtoFiltrado = this.state.produtos.filter ( produto => {

        //REGEX para o filtro por palavra com apenas algumas letras
        let regex = new RegExp('['+produto.produtoNome+']{3,}', "gmi")
        let resultadoBusca = regex.test(this.state.valorInputNome)

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
                produtoPreco={produto.produtoPreco}
                funcaoBotao={this.onClickAdicionarAoCarrinho}
                textoBotao={'Adicionar ao carrinho!!!'}
              />
            )
          })}
          </div>
        </div>
        <div className='app-carrinho'>
          <h4>Carrinho: </h4>
          <div>

          {produtosCarrinho.map( produto => {
            return (
            <ProdutoCarrinho 
              carrinhoQuantidade={produto.carrinhoQuantidade}
              produtoNome={produto.produtoNome} 
            />
            )
          })}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
