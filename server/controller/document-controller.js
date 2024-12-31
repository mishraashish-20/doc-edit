import Document from "../schema/documentSchema.js";

export const getDocument = async (id) => {
  try {
    if (id === null) return;

    const document = await Document.findById(id);

    if (document) return document;

    return await Document.create({ _id: id, data: "" });
  } catch (error) {
    console.log("this is error====>",error);
    
  }
};


export const updateDocument=async (id, data)=>{
return await Document.findByIdAndUpdate(id, {data})
}