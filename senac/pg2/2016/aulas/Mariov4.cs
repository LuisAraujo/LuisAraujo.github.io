using UnityEngine;
using System.Collections;

//renomei o arquivo para Mario.cs
public class Mario : MonoBehaviour {

	Rigidbody2D rb;

	public Transform verificaChao;
	public LayerMask layerChao;
	Animator anim;

	bool isJump;
	bool mini;
	bool nochao;
	float life;
	bool isAttack;
	bool isDefence;

	// Use this for initialization
	void Start () {
		life = 100;
		anim = GetComponent<Animator> ();
		rb = GetComponent<Rigidbody2D> ();

		mini = true;
		anim.SetBool ("mini", mini);
		life = 100;

	}

	// Update is called once per frame
	void Update () {

		if (Input.GetKey(KeyCode.RightArrow)) {
			Andar ("direita");
			anim.SetBool("move", true);
		} else if (Input.GetKey (KeyCode.LeftArrow)) {
			Andar ("esquerda");
			anim.SetBool("move", true);
		} else {

			anim.SetBool("move", false);
		}

		if (Input.GetKeyDown(KeyCode.Space)) {
			Pular ();
			isJump = true;
			anim.SetBool("jump", isJump);
		}

		//Se pressionar o botao A ataque
		if(Input.GetKeyDown(KeyCode.A)){
			if((isAttack == false) && (isDefence == false)){
				isAttack = true;
				anim.SetBool("attack", isAttack);

				//chamara a funçao "voltaEstadoNormal" em 0.5 seg.
				Invoke("voltaEstadoNormal", 0.5f);
			}

		}

		//Se pressionar o botao D defenda
		if (Input.GetKey (KeyCode.D)) {
			if ((isAttack == false) && (isDefence == false)) {
				isDefence = true;
				anim.SetBool ("defence", isDefence);
			}
		//se nao estiver pressionando e estiver no modo defesa
		} else if (isDefence) {
			isDefence = false;
			anim.SetBool ("defence", isDefence);
		}

		if (isJump) {
			if((rb.velocity.y > -0.2) && (rb.velocity.y <= 0)){
				isJump = false;
				anim.SetBool("jump", isJump);

			}

		}



	}

	void Pular(){
		nochao = Physics2D.Linecast (transform.position, verificaChao.position, layerChao);
		if (nochao) {
			rb.AddForce (new Vector2 (0, 40));
		}

	}

	void Andar(string direcao){
		if (direcao == "direita"){
			transform.Translate (new Vector2 (1, 0) * 2 * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,0);
		}else if (direcao == "esquerda"){
			transform.Translate (new Vector2 (1, 0) * 2 * Time.deltaTime);
			transform.eulerAngles = new Vector2(0,180);
		}
	}

	//funçao chamanda por invoke
	void voltaEstadoNormal(){
		isAttack = false;
		anim.SetBool("attack", isAttack);
	}



	void OnTriggerEnter2D( Collider2D objeto){

		if (objeto.tag == "cogumelo") {
			Destroy (objeto.gameObject);
			mini = false;
			anim.SetBool ("mini", mini);
			anim.Play ("MarioTransition");

	    //Se o objeto que colidiu não tiver a tag cogumelo, mas tiver a tag inimigo
		} else if (objeto.tag == "inimigo") {
			//pegando o valor do dano (Inimigo e a mesma classe que Folha, apenas mudei o nome)
			float dano= objeto.GetComponent<Inimigo>().dano;

			//se estiver no modo ataque
			if(isAttack == true){
				//toma metade do dano
				life = life - (dano/2);
				Destroy (objeto.gameObject);

		    //senao estiver no modo ataque e nem no defesa
			}else if(isDefence == false){
				//toma dano total
				life = life - dano;
			}

		}
	}

}
