using UnityEngine;
using System.Collections;

public class Inimigo : MonoBehaviour {

	public float dano = 10f;
	int life = 10;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnTriggerEnter2D( Collider2D objeto){

		Destroy(objeto.gameObject);

		if (objeto.tag == "fogo") {

			life--;

			if(life <=0)
				Destroy(gameObject);
		}
	
	}
}
