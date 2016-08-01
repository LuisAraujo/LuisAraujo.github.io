using UnityEngine;
using System.Collections;

public class Mariov1 : MonoBehaviour {


	// É chamado na inicialização
	void Start () {
	}

	// É chamado à cada frame
	void Update () {
        //Se getAxis retornar um numero maior que 0 é porque a seta da direita está pressionada
		if (Input.GetAxis ("Horizontal") > 0) {
			//chama a função andar e passa como parâmetro "direita"
			Andar ("direita");

		//Se getAxis retornar um numero menor que 0 é porque a seta da direita está pressionada
		} else if (Input.GetAxis ("Horizontal") < 0) {
			//chama a função andar e passa como parâmetro "esquerda"
			Andar("esquerda");
		}
	}

    //Função andar
	void Andar(string direcao){
        //se o parametro for para a direita
		if (direcao == "direita") {
            //coloco o angulo para 0,0
			transform.eulerAngles = new Vector2(0,0);

		} else if (direcao == "esquerda") {
			//coloco o angulo para 0,180
			transform.eulerAngles = new Vector2(0,180);
		}

        //Transladando o personagem
		transform.Translate (new Vector2 (3, 0) * Time.deltaTime);

	}


}