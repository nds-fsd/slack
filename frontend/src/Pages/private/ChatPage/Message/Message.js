import styles from "./Message.module.css";

import {format} from 'date-fns';
import { getUserSession } from "../../../../utils/localStorageUtils";
import CircleAvatar from "../../../../Componentes/circleAvatar/circleAvatar";
import CircleAvatarUsers from "../../../../Componentes/circleAvatar/circleAvatarUsers/circleAvatarUsers";

const Message = (props) =>{

	const { message} = props;

	// por defecto es un string 
	const sessionUser = getUserSession();

	const stringToColour = function(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
      }
	return (
		<div className={styles.message}>
			<div className={styles.messageAvatar}>
				<CircleAvatarUsers name={message.user.userName}  id={message.user._id} size={40} color={stringToColour(message.user.name)}/>
			</div>
			<div className={styles.messageBody}>
				<div className={styles.messageHeader}>
					<div className={styles.messageName}>{message.user.userName}</div>
					<div className={styles.messageTime}>
						{format(new Date(message.date), 'HH:mm')}
					</div>
				</div>
				<div>
					{message.text.includes('res.cloudinary.com')?
					<img src={message.text} style={{height: '100px', width: '100px'}} alt="" />:
					message.text	
				}
				</div>
			
			</div>
			
		</div>
	)
};

Message.defaultProps = {
	direction: "right"
}


export default Message;
