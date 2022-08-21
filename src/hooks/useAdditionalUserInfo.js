import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdditionalInfo } from '../helpers/db';
import { setUser } from '../redux/slicer/userSlicer';

//To add the additional information to the store , we get them from firebase DB
export const useAdditionalUserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (user === null) {
      getAdditionalInfo().then((e) => {
        dispatch(setUser({ ...user, phoneNumber: e.phoneNumber }));
      });
    }
  }, []);
};
