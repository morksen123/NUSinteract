import { Badge } from 'react-native-paper';

import { useContext } from 'react';

import { RequestContext } from '../../contexts/requestContext';

const CustomBadge = () => {

    const { numRequests } = useContext(RequestContext);

    return (
        <Badge
            style={{ position: 'absolute', top: 5, right: 51 }}
        >
            {numRequests}
        </Badge>
    )
  
};

export default CustomBadge;