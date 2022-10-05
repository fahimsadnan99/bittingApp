const bitCard = require('../Models/bitCard')


const createBitCard = async (req, res) => {
    // const url = req.protocol + "://" + req.get("host");
    // const img = url + "/upload/" + req.file.filename;
  try {

  const bitCardData = new bitCard(req.body)
  await bitCardData.save()
  res.status(201).json({message : "Card created successfully"})
  } catch (err) {
    res.status(500).json({ message : "Card creation failed"})

  }
}


const updateBitCard = async (req, res) => {
  const _id = req.params.id;
  console.log(_id, req.body);
  try{
    const find = await bitCard.findById({ _id })
    if(find){
      const findsCardById = await bitCard.findByIdAndUpdate(
        { _id },
        {bitList : [...find.bitList, req.body]},
        { new: true }
      );
      res.status(200).send({
        data: findsCardById,
      });
    }
   
  }catch(err){
    console.log(err);
    res.status(500).send({
      message : "Update Faild"
    });
  }

}

const deleteCard = async (req, res) => {
  const _id = req.params.id

  const deleteData = await bitCard.findByIdAndDelete({ _id })
  return res.status(200).json({
    message : "Product Deleted Successfully"
  })
}

const getCardById = async (req, res) => {
  const _id = req.params.id;

  const findsBitById = await bitCard.findById({ _id }).populate("bitList.user");
  res.status(200).send(findsBitById);
};


module.exports = {createBitCard,updateBitCard,deleteCard,getCardById}