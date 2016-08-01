using UnityEngine;
using System.Collections;

public class Mario : MonoBehaviour {

    //Atributo para guardar o componente RigidBody2D
	Rigidbody2D rb;
	//Atributo para guardar o componente transform do objeto verificachao
	public Transform verificaChao;
	//Atributo para guardar o Layer do chao
	public LayerMask mascaraLayer;
    //Atributo para guardar o valor (true ou falso) sobre alguma colisao entre o personagem e a linha
	bool nochao;

	// Use this for initialization
	void Start () {
        //pegando o componente e armazenando no atributo rb
		rb = GetComponent<Rigidbody2D> ();

	}

	void Update () {
		if (Input.GetAxis ("Horizontal") > 0) {
			Andar ("direita");
		} else if (Input.GetAxis ("Horizontal") < 0) {
			Andar("esquerda");
		}

        //Se getKeyDonw para o Spaco retorna verdadeiro é porque a tecla esta pressionada
		if (Input.GetKeyDown (KeyCode.Space)) {
			//chama a função pular
			Pular();
		}

	}

	void Andar(string direcao){
		if (direcao == "direita") {
			transform.eulerAngles = new Vector2(0,0);
		} else if (direcao == "esquerda") {
			transform.eulerAngles = new Vector2(0,180);
		}
        transform.Translate (new Vector2 (3, 0) * Time.deltaTime);
	}

    //função pular
	void Pular(){
        //variável guarda se existe alguma colisão na linha (somente com objetos no Layer da máscara
		nochao = Physics2D.Linecast(transform.position, verificaChao.position, mascaraLayer);

        //se existe colisao é porque ele está no chao
		if(nochao == true)
		    //adiciona uma forca no eixo y
			rb.AddForce (new Vector2 (0, 200));
	}

}
