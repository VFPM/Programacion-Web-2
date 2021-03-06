import React, { useState, useEffect } from 'react'
import './Estilos/Slider_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faCamera, faWrench, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";
import { CommunityGetComunityById } from '../services/CommunityServices';
import { StreakDelete, StreakGetByCommunity, StreakGetByCommunityIfUserIsSubscribed } from '../services/StreakServices';
import { SubscriptionCreate, SubscriptionDelete, SubscriptionGetSubscriptionsByUser, SubscriptionUpdate } from '../services/SubscriptionServices';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ListStreaks = (props) => {

    const [streaks, setStreaks] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [titlePage, setTitlePage] = useState('');
    const [streakId, setStreakId] = useState('');
    const [userSession, setUserSession] = useState();
    const [isUserSubscription, setIsUserSubscription] = useState(false);
    const Navigate = useNavigate();
    const params = useParams();
    Moment.locale('es');

    const handleCreateSubscription = async (event, streakId) => {
        try {
            await SubscriptionCreate({
                _streak: streakId,
                _user: userSession._id
            });
            console.log('Se registro con exito');
        }
        catch (err) {
            console.log(err);
        }
        Navigate('/atomek/Streaks/Community/Mi-Muro');
    }

    const handleDeleteStreak = async (event, streakId, subscriptionId) => {
        try {
            await SubscriptionUpdate({
                _id: subscriptionId,
                active: false
            });

            const subscriptionsResponse = await SubscriptionGetSubscriptionsByUser(userSession._id);
            setSubscriptions(subscriptionsResponse);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function getInitialInformation() {
        try {
            const userJSON = localStorage.getItem("UserSession");
            const usuario = (JSON.parse(userJSON));
            setUserSession(usuario);

            if (props?.propParamId == 'Mi-Muro') {
                setTitlePage('Rachas suscritas por el usuario');
                const subscriptionsResponse = await SubscriptionGetSubscriptionsByUser(usuario._id);
                setSubscriptions(subscriptionsResponse);
            }
            else {
                const communityResponse = await CommunityGetComunityById(props.propParamId);
                setTitlePage('Rachas creadas por la comunidad: ' + communityResponse?.name)

                const subscriptionsResponse = await SubscriptionGetSubscriptionsByUser(usuario._id);
                setSubscriptions(subscriptionsResponse);

                const streaksResponse = await StreakGetByCommunityIfUserIsSubscribed({_community: props?.propParamId, _user: usuario?._id});
                setStreaks(streaksResponse);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getInitialInformation();
    }, []);

    return (
        <div className="my-3 p-3 rounded border" id="RecuadroRachas">
            <h6 className="text-light border-bottom pb-2 mb-0 ">{titlePage}</h6>

            {

                props?.propParamId == 'Mi-Muro' ?
                    subscriptions?.map((subscription, index) => (
                    subscription.active == true ?
                        <div key={index} className="d-flex text-muted pt-3">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6998AB" /><text x="50%" y="50%" fill="#6998AB" dy=".3em">32x32</text></svg>
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <strong className="text-light">{subscription._streak?.title}</strong>
                                    <div>
                                        {
                                            subscription._streak?._user ?
                                                <>
                                                <Link to={'/atomek/CRacha/' + subscription._streak._id}><a className="text-light cursor-pointer"><FontAwesomeIcon icon={faPencil} value={subscription._id} /></a></Link> &ensp;
                                                </>
                                            :
                                                null
                                        }
                                        <a className="text-light cursor-pointer"><FontAwesomeIcon onClick={(e) => { handleDeleteStreak(e, subscription._streak._id, subscription?._id) }} icon={faTrash} value={subscription._id} /></a> &ensp;
                                        <Link to={'/atomek/URacha/' + subscription._id}><a className="text-light cursor-pointer"><FontAwesomeIcon icon={faPlus} value={subscription._id} /></a></Link> &ensp;
                                    </div>
                                </div>
                                <span className="text-light">Cantidad de veces hecha: {subscription.counter}</span>
                                {
                                    subscription._streak?.type == 1 ? <span className="d-block">Racha de tipo: Imagen</span>
                                        : <span className="d-block">Racha de tipo: Texto</span>
                                }
                                {
                                    subscription._streak?._user ? <span className="d-block">Propietario: Yo</span>
                                        : <span className="d-block">Propietario: Comunidad</span>
                                }
                                <span className="d-block">Suscrito el: {Moment(subscription.date_create).format('DD/MM/yyyy')}</span>
                            </div>
                        </div>
                    : null
                    ))
                :
                    streaks?.map((streak, index) => (
                    streak.active == true ?
                        <div key={index} className="d-flex text-muted pt-3">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6998AB" /><text x="50%" y="50%" fill="#6998AB" dy=".3em">32x32</text></svg>
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <strong className="text-light">{streak.title}</strong>
                                    {
                                        streak.isSubscribed != true ?
                                        <a className="text-light cursor-pointer" onClick={(e) => { handleCreateSubscription(e, streak._id) }}>
                                            <FontAwesomeIcon icon={faPlus} value={streak._id} />
                                        </a>
                                        :
                                        <a className="text-light">
                                            <FontAwesomeIcon icon={faCheck}/>
                                        </a>
                                    }
                                </div>
                                {
                                    streak?.type == 1 ? <span className="d-block">Racha de tipo: Imagen</span>
                                        : <span className="d-block">Racha de tipo: Texto</span>
                                }
                                <span className="d-block">Creado el: {Moment(streak.date_create).format('DD/MM/yyyy')}</span>
                            </div>
                        </div>
                    : null
                    ))
            }
        </div>
    )
};

export default ListStreaks;
