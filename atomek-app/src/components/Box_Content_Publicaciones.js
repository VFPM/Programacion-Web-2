import React, { useState, useEffect } from 'react'
import Publicacion from "./Publicacion";
import Crear_grupo from "./Crear_grupo";
import GruposBloque_style from "./GruposBloque_style";
import Publicar from "./Publicar";
import { Link, useParams } from "react-router-dom";
import { communityGetComunitiesByUser, CommunityGetComunitiesDiscover } from '../services/CommunityServices';
import { PostGetPostsByCommunity, PostGetPostsByUserCommunities } from '../services/PostServices';

const Content_Muro = (props) => {

    const [posts, setPosts] = useState([]);
    const [communities, setCommunities] = useState([]);


    async function handleRefreshPosts() {

        console.log("a");

        try {
            switch(props?.propParamId) {
                case 'Mi-Muro':
                    console.log("Muro");
                    console.log(props);
                    const postsMuro = await PostGetPostsByUserCommunities(props?.propUserId);
                    setPosts(postsMuro);
                    return;
        
                default:
                    console.log("Comunidad");
                    const postsCommunity = await PostGetPostsByCommunity(props?.propParamId);
                    setPosts(postsCommunity);
                    return;
            }
        }
            catch(err) {
            console.log(err);
        }
    }

    async function getInitialInformation() {
        try {
            switch(props?.propParamId) {
                case 'Mi-Muro':
                    console.log("Muro");
                    console.log(props);
                    const postsMuro = await PostGetPostsByUserCommunities(props?.propUserId);
                    setPosts(postsMuro);
                    return;
    
                case 'Descubrir':
                    console.log("Descubrir");
                    const exploreCommunities = await CommunityGetComunitiesDiscover({
                        _id: props?.propUserId
                    });
                    setCommunities(exploreCommunities);
                    console.log(exploreCommunities);
                    return;
    
                case 'Crear-Grupo':
                    return;

                case 'All-Grupos':
                    console.log("Descubrir");
                    const communitiesResponse = await communityGetComunitiesByUser({
                        _id: props?.propUserId
                    });
                    setCommunities(communitiesResponse);
                    console.log(communitiesResponse);
                    return;

                default:
                    console.log("Comunidad");
                    const postsCommunity = await PostGetPostsByCommunity(props?.propParamId);
                    setPosts(postsCommunity);
                    return;
            }
        }
            catch(err) {
            console.log(err);
        }
    }

    function loadContentMuro(id) {
        switch(id) {
            case 'Mi-Muro':
                return  <div class="contenedor_Muro bloque_contenedor_cursos">
                            <Publicar propHandleClickCreatePost={handleRefreshPosts} />

                            {posts?.map((post, index) => (
                                post._community?.active == true ?
                                    <Publicacion key={index} propPost={post} propUserId={props?.propUserId} propHandleClickUpdatePost={handleRefreshPosts}/>
                                : null
                            ))}
                        </div>;

            case 'Descubrir':
                return  <div class="contenedor_Descubrir  " id="Registro">
                            <br></br>
                            <h3>Te puede gustar</h3>
                            <div class="row">
                                {communities.map((community) => (
                                    <div className="mb-3 col-sm-12 col-mb-6 col-xl-6">
                                        <GruposBloque_style propCommunityId={community?._id} category={community._category?.title} propUserId={props?.propUserId} name={community?.name} />
                                    </div>
                                ))}
                            </div>
                        </div>;

            case 'Crear-Grupo':
                return  <div class="contenedor_Crear " id="Registro">
                            < Crear_grupo />
                        </div>;

            case 'All-Grupos':
                return  <div class="contenedor_Descubrir  " id="Registro">
                            <br></br>
                            <h3>Tus Grupos:</h3>
                            <div class="row">
                                {communities.map((community) => (
                                    <div className="mb-3 col-sm-12 col-mb-6 col-xl-6">
                                        <GruposBloque_style propCommunityId={community?._id} image={community.image} category={community._category?.title} name={community.name} />
                                    </div>
                                ))}
                            </div>
                        </div>;

            default:
                return <div class="contenedor_Muro bloque_contenedor_cursos">
                            <Publicar propHandleClickCreatePost={handleRefreshPosts}/>

                            {posts?.map((post, index) => (
                            <Publicacion key={index} propPost={post} propUserId={props?.propUserId} propHandleClickUpdatePost={handleRefreshPosts}/>
                            ))}
                        </div>;
        }
    }

    useEffect(() => {
        getInitialInformation();
    }, []);

    return (
        <div>
            {loadContentMuro(props?.propParamId)}
        </div>
    );
};

export default Content_Muro;
