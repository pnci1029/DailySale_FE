import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";

export function MainStyledComponents() {

}


export const Logo = styled('img')`
    width: 180px;
    height: auto;
    margin-bottom: 1rem;
    filter: drop-shadow(0 4px 8px rgba(242, 151, 39, 0.3));
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05) rotate(2deg);
        filter: drop-shadow(0 6px 12px rgba(242, 151, 39, 0.4));
    }
`;

export const StyledPaper = styled(Paper)`
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;
    z-index: 3;
    padding: 3rem;
    border-radius: 20px;
    border: 2px solid rgba(242, 151, 39, 0.4);
    box-shadow: 0 8px 25px rgba(242, 151, 39, 0.2);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(242, 151, 39, 0.25);
        border: 2px solid rgba(242, 151, 39, 0.6);
    }
`;

export const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '1px solid rgba(242, 151, 39, 0.2)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '5px',
        background: 'linear-gradient(90deg, #F29727, #FFCD00)',
    },
    '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: '0 15px 30px rgba(242, 151, 39, 0.2)',
        '& .MuiSvgIcon-root': {
            transform: 'scale(1.1) rotate(5deg)',
        }
    }
}));