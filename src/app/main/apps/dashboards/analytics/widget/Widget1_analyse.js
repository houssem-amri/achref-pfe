import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import format from "date-fns/format";

function Widget1_analyse(props) {
  const { admin } = props;
  const[DateNow, setDateNow] = useState(0)
  useEffect(() => {
    FilterByDate()
  }, [admin]);

  const FilterByDate = () => {
    let S = 0;
    for (let i = 0; i < admin.length; i++) {
      if (
        format(Date.now(), "dd MMM yyyy") ===
        format(new Date(admin[i].dateCreated), "dd MMM yyyy")
      ) {
        S = 1 + S;
      }
    }
    setDateNow(S);
  };
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium" color="textSecondary">
          Admin
        </Typography>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
          {/* {props.widget.data.count[currentRange]} */} {admin?.length}
        </Typography>
        <Typography className="text-18 text-blue-800 font-normal">
          Nombre Total Admin

        </Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">Ajouter aujourd'hui</span>:
        <b className="px-8">{DateNow}</b>
      </Typography>
    </Paper>
  );
}

export default Widget1_analyse;
