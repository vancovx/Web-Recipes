<?php
// =================================================================================
// HACER LOGIN
// =================================================================================
// FICHERO: api/post/usuarios/login.php
// MÉTODO: POST
// * api/usuarios/login -> Hacer login de un nuevo usuario
//      Params: usu:login del usuario; pwd:password del usuario
// =================================================================================
// INCLUSION DE LA CONEXION A LA BD
// =================================================================================
require_once('../../inc/config.php'); // Constantes, etc ...
require_once('../../inc/database.php');
// =================================================================================
// Se instancia la base de datos y el objeto producto
// =================================================================================
$db    = new Database();
$dbCon = $db->getConnection();
// =================================================================================
// CONFIGURACION DE SALIDA JSON Y CORS PARA PETICIONES AJAX
// =================================================================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
// =================================================================================
// Se prepara la respuesta
// =================================================================================
$R = [];  // Almacenará el resultado.
// =================================================================================
// Se cogen los parámetros de la petición
// =================================================================================
$PARAMS = $_POST;
// =================================================================================
if(!isset($PARAMS['usu']) || !isset($PARAMS['pwd']))
{
  $RESPONSE_CODE    = 400;
  $R['RESULTADO']   = 'ERROR';
  $R['CODIGO']      = $RESPONSE_CODE;
  $R['DESCRIPCION'] = 'Parámetros incorrectos';
}
else
{
  // Se pillan los parámetros de la petición:
  $LOGIN = $PARAMS['usu'];
  $PWD = $PARAMS['pwd'];
  try{
    // ******** INICIO DE TRANSACCION **********
    $dbCon->beginTransaction();
    $mysql = "select * from usuario where login=:LOGIN";
    $RESPUESTA = $db->select($mysql, [':LOGIN'=>$LOGIN]);
    if($RESPUESTA['CORRECTO'])
    {
        if( count($RESPUESTA['RESULT'])==1 && $RESPUESTA['RESULT'][0]['pwd'] == $PWD ) // Se comprueba si el resultado tiene un único registro y si el password coincide
        {
            $USUARIO = $RESPUESTA['RESULT'][0];

            $ultimo_acceso = $USUARIO['ultimo_acceso'];

            $tiempo = time(); // se toma la hora a la que se hizo el login
            // Genera una cadena de bytes pseudo-aleatoria, con el número de bytes determinado por el parámetro $length. También indica si se usó un algoritmo criptográficamente fuerte para producir los bytes pseudo-aleatorios, y hace esto mediante el parámetro opcional crypto_strong. Es raro que este parámetro sea FALSE, pero algunos sistemas pueden ser antiguos rotos.
            $cstrong = True;
            $length  = 64;
            $key     = bin2hex(openssl_random_pseudo_bytes($length, $cstrong));

            $mysql  = 'update usuario set token="' . $key . '"';
            $mysql .= ', ultimo_acceso="' . date('Y-m-d H:i:s', $tiempo) . '"';
            $mysql .= ' where login=:LOGIN';

            if($db->executeStatement($mysql, [':LOGIN'=>$LOGIN]))
            {
                $RESPONSE_CODE      = 200;
                $R['RESULTADO']     = 'OK';
                $R['CODIGO']        = $RESPONSE_CODE;
                $R['TOKEN']         = $key;
                $R['LOGIN']         = $LOGIN;
                $R['EMAIL']         = $USUARIO['email'];
                $R['ULTIMO_ACCESO'] = $ultimo_acceso;
            }
            else
            {
                $RESPONSE_CODE = 500;
            }
        }
        else
        {
          $RESPONSE_CODE = 401;
        }
    }
    else
    {
        $RESPONSE_CODE    = 500;
        $R['RESULTADO']   = 'ERROR' ;
        $R['DESCRIPCION'] = 'Se ha producido un error en el servidor al ejecutar la consulta.';
        $R['ERROR']       = $RESULTADO['ERROR'];
    }

    switch($RESPONSE_CODE)
    {
      case 401:
          $R['RESULTADO']   = 'ERROR';
          $R['CODIGO']      = $RESPONSE_CODE;
          $R['DESCRIPCION'] = 'Login/password no correcto';
        break;
      case 500:
          $R['RESULTADO']   = 'ERROR';
          $R['CODIGO']      = $RESPONSE_CODE;
          $R['DESCRIPCION'] = 'Se ha producido un error en el servidor.';
        break;
    }
    // ******** FIN DE TRANSACCION **********
    $dbCon->commit();
  } catch(Exception $e){
    // Se ha producido un error, se cancela la transacción.
    echo $e->getMessage();
    $dbCon->rollBack();
  }
}
// =================================================================================
// SE CIERRA LA CONEXION CON LA BD
// =================================================================================
$dbCon = null;
// =================================================================================
// SE DEVUELVE EL RESULTADO DE LA CONSULTA
// =================================================================================
http_response_code($RESPONSE_CODE);
print json_encode($R);
?>
