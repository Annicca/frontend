export const selectStyle = {

    control: (base) => ({
        ...base,
        fontSize: "16px",
        borderRadius: "10px",
        // padding: "5px 0 5px 15px",
        // width: "270px",
        boxSizing: "border-box",
        border: "2px solid #FFD700",
        transition: "all 0.3s",
        "&:hover":{
            boxShadow: "0px 7px 14px rgba(0, 0, 0, 0.14)"
        },
        "&:focus":{
            outline: "none",
            borderColor: "#FFB800",
        }
    })
  }