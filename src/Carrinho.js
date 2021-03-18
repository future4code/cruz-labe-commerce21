import React from 'react'

class Carrinho extends React.Component {
    state = {
        produtos: 
        [
            {   
                quantidade:0,
                nome: '',
            }
        ],
        valorTotal: 0

    }



    // onClickRemover = () => {

    // } 


    render() {
        return <div className='carrinho-container'>
                    <div className='carrinho-titulo'>
                        <p>Carrinho: </p>
                    </div>
                    <div className='carrinho-lista'>
                        {/* logica chamando o produto. */}
                        {/* <ItemCarrinho> */}
                    </div>
                    <div className='carrinho-total'>
                        <p> Valor total: R$ {this.state.valorTotal} </p>
                    </div>


                </div>
    }

}