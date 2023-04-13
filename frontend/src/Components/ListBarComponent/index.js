import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./styles.css";
import axios from "axios";
import { BsFillXCircleFill } from "react-icons/bs";


export const ListBar = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage
}) => {

    const API_KEY = "5fecb42aae0ab8a2d2b7164ad3c1b0b9";

    const getData = async () => {
        const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
        setGenres(genres);
        console.log("data",{genres})
    };
    
    useEffect(() => {
        getData();
        return () => {
            setGenres({});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g) => {return g.id !== genre.id}));
        return setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((g) => {
                return g.id !== genre.id
            })
        );
        setGenres([...genres, genre]);
        return setPage(1);
    };


    return (
        <aside className="asideBar">
            <h3>Filter By:</h3>
            <ListGroup>
                {
                    selectedGenres && selectedGenres.map((item)=>{
                        return (
                            <ListGroup.Item className='selected' onClick={()=>{return handleRemove(item)}} key={`${item.id}newtag`}>
                                {item.name}
                                <i><BsFillXCircleFill /></i>
                            </ListGroup.Item>
                        )
                    })
                }
                {
                    genres && genres.length > 0 ? genres.map((item)=>{
                        return(
                            <ListGroup.Item key={item.id} onClick={()=>{return handleAdd(item)}}>
                                {item.name}
                            </ListGroup.Item>
                        )
                    }) : 'Lading content...'
                }
            </ListGroup>
        </aside>
    )
}



