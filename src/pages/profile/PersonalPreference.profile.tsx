import { Link, useLocation } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { UserType } from '@/store/reducers/users/types.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { updateUser } from '@/helper/DBManger.ts';
import { toast } from 'sonner';
import { updateUser as updateUserStore } from '@/store/reducers/users/users.reducer.ts';
import { useDispatch } from 'react-redux';
import Tags from '@/components/Tags.tsx';


const PersonalPreference = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const isProfile =location.pathname === '/profile';
  const user = useAppSelector((state) => state.user.user);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserType>({
    defaultValues: {
      ...user
    },
  })
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
    }
  };

  const handleSubmit = form.handleSubmit((payload) => {
    setIsLoading(true);
    setError("")
    updateUser({
      ...payload,
      id: `${user?.id}`,

    }).then(()=>{

      dispatch(updateUserStore({
       ...payload
      }))
      toast.success("User Update Successfully")
      setIsLoading(false);
    }).catch(err=>{
      toast.error("Error",err.message)
      setIsLoading(false);
    })
  })


  return  <>
    {
      isProfile?
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="font-semibold">Hobbies & Interests</h2>
            <p>{user?.hobbies?.join('')||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Favorite Sports</h2>
            <p>{user?.sports?.join('')||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Preferred music genres</h2>
            <p>{user?.genres?.join('')||'No data'}</p>
          </div>
          <div>
            <h2 className="font-semibold">Preferred Movies/Tv Shows</h2>
            <p>{user?.movies?.join('')||'No data'}</p>
          </div>
        </div>
        :
        <>
          <form
            onKeyDown={handleKeyDown}
            className="grid gap-y-6 w-full md:w-3/4"
            onSubmit={handleSubmit}
          >
            {error&&<p className="text-red-500 text-sm font-semibold">{error}</p>}
            <FormProvider  {...form}>
              <Controller
                control={form.control}
                name="hobbies"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="hobbies"
                             className="gap-x-1"
                      >
                        Hobbies & Interests
                      </Label>
                     <Tags onChange={field.onChange} value={field.value || []}/>
                      {formState.errors.hobbies && <p className="text-red-500 text-sm font-semibold">{formState.errors.hobbies.message}</p>}
                    </div>
                  )
                }}
              />

              <Controller
                control={form.control}
                name="sports"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="sports"
                             className="gap-x-1"
                      >
                        Favorite Sports
                      </Label>
                      <Tags onChange={field.onChange} value={field.value || []}/>
                      {formState.errors.sports && <p className="text-red-500 text-sm font-semibold">{formState.errors.sports.message}</p>}
                    </div>
                  )
                }}
              />


              <Controller
                control={form.control}
                name="genres"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="genres"
                             className="gap-x-1"
                      >
                        Preferred music genres
                      </Label>
                      <Tags onChange={field.onChange} value={field.value || []}/>
                      {formState.errors.genres && <p className="text-red-500 text-sm font-semibold">{formState.errors.genres.message}</p>}
                    </div>
                  )
                }}
              />


              <Controller
                control={form.control}
                name="movies"
                render={({ field,formState }) => {
                  return (
                    <div data-slot="form-item" className="grid gap-2">
                      <Label data-slot="form-label"
                             data-error="false"
                             htmlFor="movies"
                             className="gap-x-1"
                      >
                        Preferred Movies/Tv Shows
                      </Label>
                      <Tags onChange={field.onChange} value={field.value || []}/>
                      {formState.errors.movies && <p className="text-red-500 text-sm font-semibold">{formState.errors.movies.message}</p>}
                    </div>
                  )
                }}
              />








               <div className="flex items-center space-x-2">
                 <Button loading={isLoading} variant="default" type="submit" className="w-fit">
                   Save & Update
                 </Button>
                 <Link to="/profile">
                   <Button loading={isLoading} variant="secondary" type="button" className="w-fit">
                     Cancel
                   </Button>
                 </Link>
               </div>
            </FormProvider>

          </form>
        </>
    }
  </>
}
export default PersonalPreference