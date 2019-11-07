
// this middleware executes when ever error occurred backend side 

function handleError(e,res){
    console.log(e);
    if(e){
        if(e.errors instanceof Object){
            var keysOfObject = Object.keys(e.errors);
            res.status(200).send({
                'statusCode': 1,
                'message': e['errors'][keysOfObject[0]].message
            }); 
        }else{
            res.status(200).send({
                'statusCode': 2,
                'message': e.message
            });
        }
    }else{
        res.status(404).send({
            'statusCode': 2,
            'message': "something went wrong"
        });
    }
   
}
module.exports = handleError ;