(async () => {
  try {
    const formData = new FormData();
    formData.append("name", "zerocho");
    formData.append("birth", 1994);
    const result = await axios.post(
      "http://www.zerocho.com/api/post/formdata",
      formData
    );
    console.log(result);
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
})();
