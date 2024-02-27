import {useMemo} from 'react';
import {useLocation, useParams, useNavigate, useMatches} from 'react-router-dom';
import {parseQueryParams} from '../../utils';

const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const match = useMatches();

    return useMemo(() => {
        return {
            push: navigate,
            pathname: location.pathname,
            query: {
                ...parseQueryParams(location.search),
                ...params,
            },
            match,
            location,
            navigate,
        };
    }, [params, location, navigate, match]);
};

export {useRouter};