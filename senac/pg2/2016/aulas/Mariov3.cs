using UnityEngine;
using System.Collections;
//renomei o arquivo para Mario.cs
public class Mario : MonoBehaviour {

	Rigidbody2D rb;
	public Transform verificaChao;
	public LayerMask mascaraLayer;
	Animator anim;
	bool isJump;
	bool mini;
	bool nochao;
	float life;


	// Use this for initialization
	void Start () {
		rb = GetComponent<Rigidbody2D> ();
		anim = GetComponent<Animator> ();

		mini = true;
		anim.SetBool ("mini", mini);
		life = 100;
	}

	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.RightArrow)) {
			Andar ("direita");
		}
		else if (Input.GetKey(KeyCode.LeftArrow)) {
			Andar ("esquerda");
		}else{
			anim.SetBool ("move", false);
		}

		if (Input.GetKeyDown (KeyCode.Space)) {
			Pular();
		}

		if(isJump){
			if((rb.velocity.y > - 0.05) && (rb.velocity.y < 0.0)) {
				isJump = false;
				anim.SetBool("jump", isJump);
			}

		}
	}

	void Andar(string direcao){

		if (direcao == "direita") {

			transform.eulerAngles = new Vector2 (0, 0);

		} else if (direcao == "esquerda") {
			transform.eulerAngles = new Vector2 (0, 180);
		}

		anim.SetBool ("move", true);
		transform.Translate (new Vector2 (3, 0) * Time.deltaTime);

	}


	void Pular(){
		nochao = Physics2D.Linecast(transform.position, verificaChao.position, mascaraLayer);
		if (nochao == true) {
			rb.AddForce (new Vector2 (0, 200));
			isJump = true;
			anim.SetBool("jump", isJump);
		}

	}

    //Esse método é chamado sempre que ocorre uma nova colisão
	void OnTriggerEnter2D( Collider2D objeto){
        //se o objeto que colidiu tiver uma tag "cogumelo"
		if (objeto.tag == "cogumelo") {
		    //destroi o objeto
			Destroy (objeto.gameObject);
			//mini é false
			mini = false;
			//passa o parâmetro mini
			anim.SetBool ("mini", mini);
			//executa a animacao de transicao
			anim.Play ("MarioTransition");

        //Se o objeto que colidiu não tiver a tag cogumelo, mas tiver a tag folha
		} else if (objeto.tag == "folha") {
            //Pegando o valo do dado no componente Folha (Script) no objeto folha
			float dano = objeto.GetComponent<Folha>().dano;
			//subtraíndo o dano da vida
			life = life - dano;
			//Destroi o objeto
			Destroy (objeto.gameObject);

        }
	}


}
