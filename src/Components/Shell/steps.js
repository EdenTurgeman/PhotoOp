import PathPage from "../PathPage/PathPage";
import StructurePage from "../StructurePage/StructurePage";
import StartPage from "../StartPage/StartPage";

const steps = [
    {
        label: 'Location',
        component: PathPage,
        completed: false
    },
    {
        label: 'Folders',
        component: StructurePage,
        subText: 'Optional',
        completed: false
    },
    {
        label: 'Start',
        component: StartPage,
        completed: false
    }
];

export default steps;