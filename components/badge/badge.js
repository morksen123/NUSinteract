import { Badge } from 'react-native-paper';

import { useContext } from 'react';

import { NotificationContext } from '../../contexts/notificationContext';

const CustomBadge = () => {

    const { notiCount } = useContext(NotificationContext);

    return (
        <Badge
            style={{ position: 'absolute', top: 5, right: 51 }}
        >
            {notiCount}
        </Badge>
    )
  
};

export default CustomBadge;