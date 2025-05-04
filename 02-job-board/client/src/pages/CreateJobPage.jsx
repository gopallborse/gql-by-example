import { useState } from 'react';
import {useNavigate} from "react-router";
// import { createJob, createJobMutation, jobByIdQuery } from '../lib/graphql/queries';
// import { createJobMutation, jobByIdQuery } from '../lib/graphql/queries';
// import { useMutation } from '@apollo/client';
import { useCreateJob } from '../lib/graphql/hooks';

function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // const [mutate, { loading }] = useMutation(createJobMutation);

  const {createJob, loading} = useCreateJob();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('should post a new job:', { title, description });
    // const job = await createJob({ title, description });
    // const {
    //   data: { job },
    // } = await mutate({
    //   variables: { input: { title, description } },
    //   update: (cache, { data }) => {
    //     cache.writeQuery({
    //       query: jobByIdQuery,
    //       variables: { id: data.job.id },
    //       data,
    //     });
    //   },
    // });
    const job = await createJob(title, description);
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit} disabled={loading}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
